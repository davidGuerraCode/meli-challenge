import cn from '../../lib/cn';
import { formatPrice } from '../../lib/formatPrice';
import { type Installments } from '../../types/Products';

type InstallmentsProps = {
  installments: Installments;
  className?: string;
};

const Installments: React.FC<InstallmentsProps> = ({
  installments,
  className,
}) => {
  return (
    <p className={cn('text-sm font-normal text-meli-green', className)}>
      Mismo precio en {installments.quantity} cuotas de{' '}
      {formatPrice({ price: installments.amount })}
    </p>
  );
};

export default Installments;
