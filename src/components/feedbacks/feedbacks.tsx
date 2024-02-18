import FeedbackForm from '../../components/feedback-form/feedback-form';
import { Feedback } from '../../types/offer';
import FeedbackItem from '../feedback-item/feedback-item';
import { AuthorizationStatus } from '../../const';

type FeedbacksProps = {
  feedbacks: Feedback[];
  authorizationStatus: AuthorizationStatus;
  hotelId: string;
}

function Feedbacks({feedbacks, authorizationStatus, hotelId}: FeedbacksProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
                      Reviews &middot; <span className="reviews__amount">{feedbacks.length}</span>
      </h2>
      <ul className="reviews__list">
        {feedbacks.slice(0, 10).map((feedback, index) => {
          const keyFeedbackValue = `${index}-${feedback.user.avatarUrl}`;
          return (
            <li className="reviews__item" key={keyFeedbackValue}>
              <FeedbackItem feedback={feedback} />
            </li>
          );
        })}
      </ul>
      {(authorizationStatus === AuthorizationStatus.Auth) ? <FeedbackForm hotelId={hotelId}/> : null}
    </section>
  );
}

export default Feedbacks;
