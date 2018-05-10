import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class ProfileGitHub extends Component {
    constructor(props){
        super(props);
        this.state={
            clientId:'485f1e06454b3a7ccd74',
            clientSecret:'4c2f0eb8cea8bac357f5f89bddbd2eef0fe3aa4a',
            count:5,
            sort:'created:asc',
            repos:[]
        }
    }
    componentDidMount(){
        const {username} = this.props;
        console.log(username);

        const {count,sort,clientId,clientSecret} = this.state;
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(this.refs.myRef){
                this.setState({
                    repos:data
                })
            }          
        })
        .catch(err=>console.log(err))
    }
    showGitHub=(repos)=>{
        let result=null;
        console.log(repos);
         result= repos.map((repo,index)=>{
           return (
                <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <Link to={repo.html_url} className="text-info" target="_blank">
                      {repo.name}
                      </Link>
                    </h4>
                    <p>{repo.description}</p>
                  </div>
                  <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                      Stars: {repo.stargazers_count}
                    </span>
                    <span className="badge badge-secondary mr-1">
                      Watchers: {repo.watchers_count}
                    </span>
                    <span className="badge badge-success">
                      Forks: {repo.forks_count}
                    </span>
                  </div>
                </div>
              </div>
            ) 
          }
        )
        console.log(result);
        return result
    }
    render() {
        const {repos} = this.state;
        return (
            <div ref="myRef">
            <h3 className="mb-4">Latest Github Repos</h3>            
                {this.showGitHub(repos)}
            </div>            
        )
    }
}
