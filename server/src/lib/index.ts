interface PathSegment {
  id: string;
  name: string;
}

interface Value {
  id: string;
  name: string;
  path_from_root: PathSegment[];
}

interface Category {
  id: string;
  name: string;
  type: string;
  values: Value[];
}

export const getCategoriesFromFilters = (filters: Category[]) => {
  const categoriesList = filters.find(filter => filter.id === 'category');
  const categories = categoriesList?.values.map(category => category.name);

  return categories;
};

export const getBreadCrumb = (path_from_root: PathSegment[]) => {
  return path_from_root.map(segment => segment.name);
};
