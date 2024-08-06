import * as Yup from "yup";
import css from "./UserSettingsForm.module.css";
import svg from "/sprite.svg";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SUPPORTED_FORMATS } from "../../constants";
import { useState } from "react";

export default function UserSettingsForm() {
  const [avatar, setAvatar] = useState(null);

  const PhotoUploadHandler = (event) => {
    const file = event.currentTarget.files[0];
    if (SUPPORTED_FORMATS.includes(file.type)) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    } else {
      console.error("Unsupported file format");
    }
  };

  let validateSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "minimal 3 characters")
      .max(50, "maximum 50 characters")
      .required("Name is required"),
    weight: Yup.number()
      .typeError("Must be a number")
      .min(30, "minimal weight 30 kg")
      .required("Weight is required"),
    sportTime: Yup.number()
      .typeError("Must be a number")
      .positive("Сan't be negative")
      .required("Time of sport activity is required"),
    dailyRateWater: Yup.number()
      .typeError("Must be a number")
      .positive("Сan't be negative")
      .required("Water consumption is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: { gender: "man", email: "az.36419.a@gmail.com" },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("userName", data.userName);
    formData.append("weight", data.weight);
    formData.append("sportTime", data.sportTime);
    formData.append("dailyRateWater", data.dailyRateWater);
    formData.append("gender", data.gender);
    formData.append("email", data.email);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingForm}>
      <div className={css.uploadPhotoContainer}>
        <img className={css.img} src={avatar || ""} alt="User avatar" />
        <label>
          <button
            className={css.button}
            type="button"
            onClick={() => document.getElementById("file").click()}
          >
            <svg className={css.uploadSvg}>
              <use href={`${svg}#icon-upload`} />
            </svg>
            <input
              className={css.input}
              id="file"
              type="file"
              onChange={PhotoUploadHandler}
            />
            Upload a photo
          </button>
        </label>
      </div>
      <div className={css.formWrapper}>
        <div className={css.firstPart}>
          <div className={css.radioGroup}>
            <h2 className={css.genderTitle}>Your gender identity</h2>
            <div className={css.radioButtonsWrapper}>
              <label>
                <input
                  className={css.radioInput}
                  type="radio"
                  name="gender"
                  value="woman"
                  {...register("gender")}
                />
                <span className={css.customRadio}></span>
                Woman
              </label>
              <label>
                <input
                  className={css.radioInput}
                  type="radio"
                  name="gender"
                  value="man"
                  {...register("gender")}
                />
                <span className={css.customRadio}></span>
                Man
              </label>
            </div>
          </div>
          <div className={css.nameEmailWrapper}>
            <div className={css.name}>
              <label htmlFor="userName" className="">
                <h2 className={css.formTitle}>Your name</h2>
                <input
                  {...register("userName")}
                  className={clsx(
                    css.formInput,
                    errors.userName ? css.errorInput : ""
                  )}
                  name="userName"
                  id="userName"
                />
              </label>
              {errors.userName && (
                <span className={css.errorMessage}>
                  {errors.userName.message}
                </span>
              )}
            </div>
            <div className="">
              <label htmlFor="email" className="">
                <h2 className={css.formTitle}>Email</h2>
                <input
                  className={css.formInput}
                  name="email"
                  id="email disabled"
                  disabled
                  {...register("email")}
                />
              </label>
            </div>
          </div>
          <div className={css.dailyNormaContainer}>
            <h2 className={css.formTitle}>My daily norma</h2>
            <ul className={css.formulaList}>
              <li className={css.listItem}>
                For woman:
                <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>
              </li>
              <li className={css.listItem}>
                For man:
                <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
              </li>
            </ul>
            <div className={css.normaDescriptionContainer}>
              <p>
                <span className={css.normaDescriptionSpan}>*</span> V is the
                volume of the water norm in liters per day, M is your body
                weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>
            </div>
            <p className={css.activeTime}>
              <svg className={css.exclamationMarkSvg}>
                <use href={`${svg}#icon-exclamation-mark`} />
              </svg>
              Active time in hours
            </p>
          </div>
        </div>
        <div className={css.secondPart}>
          <div className={css.UserParamsContainer}>
            <div className={css.weight}>
              <label htmlFor="weight" className="">
                <p className={css.formText}>Your weight in kilograms:</p>
                <input
                  className={clsx(
                    css.formInput,
                    errors.weight ? css.errorInput : ""
                  )}
                  name="weight"
                  id="weight"
                  {...register("weight")}
                />
              </label>
              {errors.weight && (
                <span className={css.errorMessage}>
                  {errors.weight.message}
                </span>
              )}
            </div>

            <div className="">
              <label htmlFor="sportTime" className="">
                <p className={css.formText}>
                  The time of active participation in sports:
                </p>
                <input
                  className={clsx(
                    css.formInput,
                    errors.sportTime ? css.errorInput : ""
                  )}
                  name="sportTime"
                  id="sportTime"
                  {...register("sportTime")}
                />
              </label>
              {errors.sportTime && (
                <span className={css.errorMessage}>
                  {errors.sportTime.message}
                </span>
              )}
            </div>
          </div>
          <div className={css.waterPerDayContainer}>
            <p className={css.waterPerDayText}>
              The required amount of water in liters per day:
              <span className={css.formula}>1.8L</span>
            </p>
            <div className="">
              <label htmlFor="dailyRateWater" className="">
                <h2 className={css.formTitle}>
                  Write down how much water you will drink:
                </h2>
                <input
                  className={clsx(
                    css.formInput,
                    errors.dailyRateWater ? css.errorInput : ""
                  )}
                  name="dailyRateWater"
                  id="dailyRateWater"
                  {...register("dailyRateWater")}
                />
              </label>
              {errors.dailyRateWater && (
                <span className={css.errorMessage}>
                  {errors.dailyRateWater.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className={css.formButton} type="submit">
        Save
      </button>
    </form>
  );
}
