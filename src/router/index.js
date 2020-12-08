import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home');
const ActualCourse = () => import('../views/actual_course/ActualCourse');
const FreeCourse = () => import('../views/free_course/FreeCourse');
const LightCourse = () => import('../views/light_course/LightCourse');

Vue.use(VueRouter);

const routes = [
	{path: '/', name: 'Home', component: Home},
	{path: '/actual-course', name: 'actual-course', component: ActualCourse},
	{path: '/free-course', name: 'free-course', component: FreeCourse},
	{path: '/light-course', name: 'light-course', component: LightCourse},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router
