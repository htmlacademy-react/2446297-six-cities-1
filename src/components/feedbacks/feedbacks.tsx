import FeedbackForm from '../../components/feedback-form/feedback-form';
import { Feedback } from '../../types/offer';
import FeedbackItem from '../feedback-item/feedback-item';

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
              <FeedbackItem feedback={feedback} />
            </li>
          );
        })}
      </ul>
      <FeedbackForm />
    </section>
  );
}

export default Feedbacks;
