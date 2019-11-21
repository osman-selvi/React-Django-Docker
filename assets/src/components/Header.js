import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            name: 'osman',
            loading: true
        }
    }

    componentDidMount() {
        const url = "http://localhost/api/v1/categories/";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    headerData: data.results,
                    loading: false
                });
            })
    }


    render() {

        if (this.state.loading) {
            return <div>loading</div>
        }

        console.log(this.state.headerData)

        return (
            <div>
                <ul>
                    {this.state.headerData.map((item) => {
                        return (
                            <li key={item.id}><Link to={item.url}>{item.title}</Link></li>
                        )
                    })}

                </ul>
            </div>
        );
    }
}

export default Header;