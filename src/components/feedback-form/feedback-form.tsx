import { useState, FormEvent, Fragment } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector';
import { addCommentAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { RATING_VALUES } from '../../const';
import { getCommentDataPostingStatus } from '../../store/offers-data/selectors';

type FeedbackFormProps = {
  hotelId: string;
}

function FeedbackForm({hotelId}: FeedbackFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isCommentDataPostingStatus = useAppSelector(getCommentDataPostingStatus);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const handleFieldChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: (name === 'rating') ? +value : value });
  };

  const onSubmit = () => {
    dispatch(addCommentAction({hotelId: Number(hotelId), feedback: {comment: formData.review, rating: formData.rating}}));
    setFormData({rating: 0, review: ''});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (formData.review !== '' && formData.rating > 0) {
      onSubmit();
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((rating) => (
          <Fragment key={rating.mark}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating.mark}
              id={`${rating.mark}-star${rating.mark > 1 ? 's' : ''}`}
              onChange={handleFieldChange}
              type="radio"
              checked={formData.rating === rating.mark}
              disabled={isCommentDataPostingStatus}
            />
            <label
              htmlFor={`${rating.mark}-star${rating.mark > 1 ? 's' : ''}`}
              className="reviews__rating-label form__rating-label"
              title={rating.text}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        value={formData.review}
        name="review"
        onChange={handleFieldChange}
        maxLength={300}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isCommentDataPostingStatus}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={formData.rating === 0 || formData.review === '' || formData.review.length < 50 || formData.review.length > 300 || isCommentDataPostingStatus}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
