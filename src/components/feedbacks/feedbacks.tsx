import FeedbackForm from '../../components/feedback-form/feedback-form';
import { Feedback } from '../../types/offer';

type FeedbacksProps = {
  feedbacks: Feedback[];
}

function Feedbacks({feedbacks}: FeedbacksProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
                      Reviews &middot; <span className="reviews__amount">{feedbacks.length}</span>
      </h2>
      <ul className="reviews__list">
        {feedbacks.map((feedback, index) => {
          const keyFeedbackValue = `${index}-${feedback.user.avatarUrl}`;
          return (
            <li className="reviews__item" key={keyFeedbackValue}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={feedback.user.avatarUrl}
                    width="54"
                    height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{feedback.user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: `${feedback.rating * 20}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {feedback.comment}
                </p>
                <time className="reviews__time" dateTime={feedback.date}>
                  {feedback.date}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      <FeedbackForm />
    </section>
  );
}

export default Feedbacks;
