import { useState, FormEvent, useRef, Fragment } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addCommentAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type FeedbackFormProps = {
  hotelId: string;
}

function FeedbackForm({hotelId}: FeedbackFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isCommentDataPostingStatus = useAppSelector((state) => state.isCommentDataPostingStatus);
  const ratingArr = [{mark: 5, text: 'perfect'}, {mark: 4, text: 'good'}, {mark: 3, text: 'not bad'}, {mark: 2, text: 'badly'}, {mark: 1, text: 'terribly'}];
  const [ratingNumber, setRatingNumber] = useState(0);
  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const fieldChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = evt.target;
    if (name === 'rating') {
      setRatingNumber(Number(value));
    }
    setFormData({ ...formData, [name]: (name === 'rating') ? +value : value });
  };

  const onSubmit = () => {
    if (formData.rating > 0 && formData.review !== '') {
      dispatch(addCommentAction({hotelId: Number(hotelId), feedback: {comment: formData.review, rating: formData.rating}}));
      setFormData({rating: 0, review: ''});
      setRatingNumber(0);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (reviewRef.current !== null && ratingNumber > 0) {
      onSubmit();
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingArr.map((rating) => (
          <Fragment key={rating.mark}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating.mark}
              id={`${rating.mark}-star${rating.mark > 1 ? 's' : ''}`}
              onChange={fieldChangeHandler}
              type="radio"
              checked={ratingNumber === rating.mark}
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
        ref={reviewRef}
        onChange={fieldChangeHandler}
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
          disabled={formData.rating === 0 || formData.review === '' || isCommentDataPostingStatus}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
