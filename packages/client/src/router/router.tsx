import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/game/HomePage';
import NotFoundPage from '@/pages/404/NotFoundPage'; // Создадим этот компонент

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

export default router;
