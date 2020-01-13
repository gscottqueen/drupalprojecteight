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
    // get our data
    const endpoint = "//drupalproject.localhost:8000/jsonapi/node/article?&include=field_image"

    fetch(endpoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            images: result.included,
            articles: result.data,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    // our styles
    let listResetStyle = {
      margin: '0',
      padding: '0',
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-between',
    }

    let listItem = {
      minWidth: "33%",
      // margin: "10px",
    }

    let imgStyle = {
      maxHeight: "240px",
    }


    return (
      <ul style={listResetStyle}>
        {this.state.images.map((item, index) => {
          console.log(item)
          return (
            <React.Fragment>
                  <li id={index} style={listItem}>
                    <img
                      src={item.attributes.uri.url}
                      style={imgStyle}/>
                      {this.state.articles.map((item,key) => {
                        if (key === index) {
                          return (
                          <div>
                              <a href={'/node/' + item.attributes.drupal_internal__nid}>{item.attributes.title}</a>
                          </div>
                      )
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
