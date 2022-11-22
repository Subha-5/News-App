import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props; // props destructuring
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="badge rounded-pill bg-danger"
                        style={{ display: 'flex', justifyContent: 'flexEnd', position: 'absolute', right: '0' }}>{source}</span>
                    <img src={imageUrl ? imageUrl : "https://reactjs.org/logo-og.png"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                            {/* <span className="badge rounded-pill bg-success">New</span> */}
                        </h5>
                        <p className="card-text">{description}....</p>
                        <p className="card-text"><small className="text-muted">
                            By {author ? author : 'Anonymous'} on {new Date(date).toGMTString()}
                        </small></p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem