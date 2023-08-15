import type { PageServerLoad } from './$types';
import axios from 'axios';

export const load: PageServerLoad = async () => {
	let industries;
	try {
		const response = await axios.get('https://dev-api.voolt.com/api/cms/industries');
		industries = response.data;
	} catch (err) {
		console.log(err);
	}

	return { industries };
};
