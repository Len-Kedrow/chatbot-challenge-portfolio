import React from "react";

const Info = ({ onClose }) => {
  return (
    <>
      <div className="info-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>How to Play</h2>
        <h3>Quick Tips for Success:</h3>
        <h4>Your Character, Your Rules:</h4>
        <p>
          You&apos;ve already customized your character—now it&apos;s time to
          use those stats to your advantage!
        </p>
        <ul>
          <li>
            <strong>Strength:</strong> Intimidate and overpower.
          </li>
          <li>
            <strong>Intelligence:</strong> Outsmart and outthink.
          </li>
          <li>
            <strong>Charisma:</strong> Charm and persuade.
          </li>
        </ul>
        <h4>Turn-Based Gameplay:</h4>
        <p>
          It&apos;s a back-and-forth with the AI boss. Take turns making your
          move—plan each response carefully! The boss will remember your
          actions, so every choice counts.
        </p>
        <p>
          Remember, the better your stats match the situation, the more likely
          you&apos;ll succeed. Use your strengths!
        </p>
        <h4>Strategize to Win:</h4>
        <p>
          Keep an eye on how the AI boss reacts. If something&apos;s not
          working, switch up your strategy!
        </p>
        <p>
          You&apos;ve only got so many turns to convince the boss—make each one
          count.
        </p>
        <h4>Final Goal:</h4>
        <p>
          Seal the deal before you run out of turns! Whether it&apos;s selling
          an item or avoiding dragon&apos;s breath, the choice is yours. But if
          you hit zero turns and the boss isn&apos;t convinced...well,
          let&apos;s just say it might be time to run.
        </p>
        <h4>Collect Your Rewards:</h4>
        <p>
          Win the round, collect your gold, and prepare for bigger challenges
          ahead.
        </p>
        <h4>Need a Reminder?</h4>
        <p>
          Just pop back here anytime for a quick refresh on the rules and tips.
        </p>
        <p>
          Now, get back in there and show that AI boss who&apos;s in charge!
        </p>
      </div>
    </>
  );
};

export default Info;
