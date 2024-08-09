import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { Layout } from '../../components/layouts/Layout/Layout.jsx';

import css from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <Layout
      leftComponent={{
        component: <WaterMainInfo />,
        bg: 'var(--color-second-bg)',
      }}
      rightComponent={{
        component: <WaterDetailedInfo />,
        bg: 'var(--color-main-bg)',
      }}
    />
  );
}
