import express, { json } from 'express';
import { itemDetailsAdapter } from './adapters/item-details.adapter';
import { itemsAdapter } from './adapters/items.adapter';
import { SERVER_CONFIG } from './config/config';
import { getCategoriesFromFilters } from './lib';

const app = express();

app.use(json());
app.disable('x-powered-by');
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Allow', 'GET, POST');
  next();
});

app.get(`${SERVER_CONFIG.API_ROOT}/items`, async (req, res) => {
  const searchQuery = req.query.search;
  const offSet = req.query.offset ?? '';
  const limit = req.query.limit ?? '';

  const items = await fetch(
    `${SERVER_CONFIG.MELI_API_URL}/sites/MLA/search?q=${searchQuery}&offset=${offSet}&limit=${limit}`
  );

  if (!items.ok) {
    res.status(items.status).send(items.statusText);
  }

  const response = await items.json();
  const categories = getCategoriesFromFilters(response.filters);

  res.status(200).send({ categories, items: itemsAdapter(response.results) });
});

app.get(`${SERVER_CONFIG.API_ROOT}/items/:id`, async (req, res) => {
  const { id } = req.params;

  const itemDetails = fetch(`${SERVER_CONFIG.MELI_API_URL}/items/${id}`).then(
    res => res.json()
  );
  const itemDescription = fetch(
    `${SERVER_CONFIG.MELI_API_URL}/items/${id}/description`
  ).then(res => res.json());
  const [itemDetailsResponse, itemDescriptionResponse] =
    await Promise.allSettled([itemDetails, itemDescription]);

  if (itemDetailsResponse.status === 'rejected') {
    res.status(500).send(itemDetailsResponse.reason);
    return;
  } else if (itemDescriptionResponse.status === 'rejected') {
    res.status(500).send(itemDescriptionResponse.reason);
    return;
  }

  const categoriesResponse = await fetch(
    `${SERVER_CONFIG.MELI_API_URL}/categories/${itemDetailsResponse.value.category_id}`
  ).then(res => res.json());

  res.status(200).send({
    item: {
      ...itemDetailsAdapter(
        itemDetailsResponse.value,
        itemDescriptionResponse.value
      ),
      category_path_from_root: categoriesResponse.path_from_root,
    },
  });
});

// 404 handler
app.use((_, res) => {
  res.status(404).send('Not found');
});

const PORT = SERVER_CONFIG.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
