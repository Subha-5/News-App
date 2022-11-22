import React,// { Component } 
{useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

// export class News extends Component {
const News = (props) => {
    
    /*constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        // document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }*/
    // Constructor ===>>> useState
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    /*updateNews = async () => {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`

        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        // console.log(data)
        let parsedData = await data.json()
        this.props.setProgress(70)
        // console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100)
    }*/
    
    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`
    
        setLoading( true )
        let data = await fetch(url);
        props.setProgress(30)
        // console.log(data)
        let parsedData = await data.json()
        props.setProgress(70)
        // console.log(parsedData)

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    /*async componentDidMount() {
        this.updateNews()
    }*/
    // componentDidMount ===>>> useEffect
    useEffect( () => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews() 
    }, [] )

/*
    handlePrevClick = async () => {
    // const handlePrevClick = async () => {
        this.setState({
            page: this.state.page - 1
        }) // setPage(page-1)
        this.updateNews() // updateNews()
    }
    handleNextClick = async () => {
    // const handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        }) // setPage(page+1)
        this.updateNews() // updateNews()
    }
*/

    /*fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    }*/
    const fetchMoreData = async () => {
        // setPage(page + 1) // setPage() takes some time to load since it is async function that's why we first update the page in url then set Page to next page
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}&category=${props.category}`
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }


    // render() {
        return (
            <>
                {/* <h1 className='text-center' style={{ margin: '75px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1> */}
                <h1 className='text-center' style={{ margin: '75px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>

                {/* {this.state.loading && <Spinner />} */}
                {loading && <Spinner />}

                {/* <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}
                > */}
                <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {
                                // !this.state.loading && this.state.articles.map((element, key) => {
                                articles.map((element) => {
                                    return (
                                        <div className="col-md-4">
                                            <NewsItem
                                                title={element.title ? element.title : ""}
                                                description={element.description ? element.description.slice(0, 90) : ""}
                                                imageUrl={element.urlToImage}
                                                newsUrl={element.url}
                                                author={element.author}
                                                date={element.publishedAt}
                                                source={element.source.name}
                                            />
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container">
                     <div className="d-flex justify content justify-content-between">
                         <button className="btn btn-dark" type="button"
                             onClick={this.handlePrevClick}
                             disabled={this.state.page <= 1}>
                             &larr; Previous
                         </button>
                         <button className="btn btn-dark" type="button"
                             onClick={this.handleNextClick}
                             hidden={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>
                             Next &rarr;
                         </button>
                     </div>
                 </div> */}
            </>
        )
    // }
}

// static defaultProps = {
News.defaultProps = {
    country: 'in',
    pageSize: 3,
    category: 'general'
}
// static propTypes = {
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News