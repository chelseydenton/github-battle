var axios = require('axios');

module.exports = {
	fetchPopularRepos: function(lang) {
		var uri = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+lang+'&sort=stars&order=desc&type=Repositories');
		
		return axios.get(uri).then(function(response){
			return response.data.items;
		});
	}
}