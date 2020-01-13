// Import not needed because React & ReactDOM are loaded by *.libraries.yml
class Promoted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      articles: [],
    };
  }

  componentDidMount() {
    const endpoint = "//drupalproject.localhost:8000/jsonapi/node/article?fields[node--article]=title,created,changed,body?sort=created&include=field_image"
    fetch(endpoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            images: result.included,
            articles: result.data,
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {

    // console.log("articles", this.state.articles)
    // console.log("images", this.state.images)
    // console.log(promo)
    return (
      <ul>
        {this.state.images.map((item, index) => {
          return (
            <React.Fragment>
            <li id={index}>
                <img src={item.attributes.uri.url} />
                {this.state.articles.map((item,key) => {
                  if (key === index) {
                    return <div>{item.attributes.title}</div>
                  }
                })}
            </li>
            </React.Fragment>
          )
        })}
      </ul>
    )
  }
}

ReactDOM.render(
  <Promoted />,
  document.getElementById('promoted-article')
);
