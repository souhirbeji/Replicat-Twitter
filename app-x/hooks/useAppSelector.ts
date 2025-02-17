import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected => useSelector(selector);