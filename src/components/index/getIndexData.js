
import React, {Component} from 'react';

class GetData extends Component {
	constructor (...args) {
		super(...args);

		this.state = {
			data: {}
		};

	}

	componentDidMount () {

		new Request('/api/index')
		  .on('finish', e => {
		  	if (e.status !== 200) {
		  		return;
		  	}
		  	
		  	try {
		  		var data = JSON.parse(e.text).data;
		  		this.setState({
						data: data
					})
		  	} catch (ex) {

		  	}
		  })
		  .send();
	}
};

export { GetData };
