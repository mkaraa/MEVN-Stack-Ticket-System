import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ResponseTicket from './components/ResponseTicket';

const routes = [
    // Public Route
    {
        path: '/login',
        component: LoginScreen,
        name: 'Login'
    },
    // Protected Route
    {
        path: '/',
        component: HomeScreen
    },
    {
        path: '/home',
        component: HomeScreen,
        name: 'Home'
    },
    {
        path: '/responseTicket/:id',
        component: ResponseTicket,
        name: 'Response Ticket'
    },
];

export default routes;