import React, { Fragment } from "react";
import SERVER_URL from "../../../config";
import axios from "axios";
// import $ from 'jquery';

class Question extends React.Component {
  state = {
    questionData: []
  };

  componentDidMount() {
    axios
      .get(SERVER_URL + "question/active")
      .then(res => {
        if (res.data) {
          this.setState({ questionData: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let datas = this.state.questionData;

    return (
      <section className="home-faq-section faq-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-4">
              <h2>Frequently Asked Question</h2>
              <p>
                Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                augue. Curabitur ullamcorperi.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
                voluptatibus, tempora odio dicta molestiae recusandae delectus
                perferendis eveniet aspernatur voluptatum earum dolore
                necessitatibus odit perspiciatis eos, quidem soluta autem esse.
              </p>
            </div>
            <div className="col-lg-7">
              {datas === null ? (
                "Loading...."
              ) : (
                <dl className="accordion" id="accordionExample">
                  {datas.map(data => (
                      
                    <Fragment key={data._id}>
                      <dt
                        data-toggle="collapse"
                        data-target={`#${data._id}`}
                        aria-expanded="true"
                        aria-controls={data._id}
                      >
                        <a>
                          {data.question_text}
                          <span className="float-right">
                            <i className="ti-angle-down"></i>
                          </span>
                        </a>
                      </dt>
                      <dd
                        id={data._id}
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        {data.question_text_answer}
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Question;
