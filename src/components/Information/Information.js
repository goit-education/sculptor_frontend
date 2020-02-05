import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Information.module.css';

const Information = () => {
  return (
    <div className={s.info_container}>
      <h2 className={s.title}>Application information</h2>
      <p className={s.text}>
        People often spend time planning carefully about themselves becoming
        happier, less anxious and more fulfilled, as well as physically
        healthier. They become more productive, persistent and engaged in life.
        This is because thinking about where you came from, who you are and
        where you are going helps you chart a simpler and more rewarding path
        through life.
      </p>
      <p className={s.text}>
        The Sculptor helps you remember, articulate and analyze key step-stones
        required for successful goal achievements or building new, useful and
        solid habits.
      </p>
      <p className={s.text}>
        With this application, you will envision a meaningful, healthy and
        productive future, 9 weeks down the road, and develop a detailed,
        implementable plan to make that future a reality.
      </p>
      <p className={s.text}>
        Put your past to rest! Understand and improve your present personality!
        Design the future you want to live! The Sculptor will help you in
        improving your life.
      </p>
      <h3 className={s.subtitle}>Rules</h3>
      <p className={s.text}>
        You can pick up to three goals for one cycle. Plan your week according
        to the goals you set and add up to 5 tasks for each goal. The thing is
        not to fill your schedule with as many tasks as possible, but to create
        a certain route, that will help you to achieve you goal by taking small
        steps every day.
      </p>
      <p className={s.text}>
        If you want to do something regularly, let’s develop a habit! Start with
        simple habits, e.g. meditate for 5 minutes, do 10 push-ups, read 10
        pages. The main goal here is to form a new habit without a lot of
        efforts and make it automatic (like brushing teeth in the morning).
        Initially aim low but aim up along the way by picking tougher habits.
        Try to add new habits every cycle.
      </p>
      <p className={s.text}>
        Mark every single task with Success mark or Fail mark to see your
        progress, which will be displayed in the Results section. This will help
        you to analyze the current cycle and make the future cycles even more
        productive.
      </p>
      <h3 className={s.subtitle}>Quotes</h3>
      <p className={s.text}>
        &quot;If you are in a dark and terrible place and someone says,
        &quot;You are okay the way you are&ldquo;, then you don&apos;t know what
        to do about that.
      </p>
      <p className={s.text}>
        You might say, &quot;No, I am not. I am having a terrible time and I am
        hopeless. However, I can be better.&ldquo; Actually, you can be
        incomparably better across multiple dimensions and in pursuing that
        &quot;better&ldquo; that is where you will find the meaning in your
        life. Which is the antidote to the suffering. © JP
      </p>
      <NavLink to="/dashboard" className={s.button_container}>
        <button className={s.button} type="submit">
          to dashboard
        </button>
      </NavLink>
    </div>
  );
};

export default Information;
