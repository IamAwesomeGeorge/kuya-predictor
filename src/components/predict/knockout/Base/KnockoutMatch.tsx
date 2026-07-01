import type { MatchInfo, TeamInfo } from "../../../../models/Infos";
import type { PredictKnockout } from "../../../../models/Predict";
import { hasMatchFinished, hasMatchStarted } from "../../../utils/TimeUtils";
import KnockoutMatchEdit from "../Edit/KnockoutMatchEdit";
import KnockoutMatchStanding from "../Standings/KnockoutMatchStanding";
import KnockoutMatchView from "../View/KnockoutMatchView";

interface KnockoutMatchProps {
  id: number;
  preview: boolean;
  matches: MatchInfo[];
  knockoutMode: "allTheWay" | "knockout" | "standings";
  topTeamLabel: string;
  bottomTeamLabel: string;
  topTeam?: TeamInfo;
  bottomTeam?: TeamInfo;
  currentPrediction?: PredictKnockout;
}

export default function KnockoutMatch({
  id,
  preview,
  matches,
  knockoutMode,
  topTeamLabel,
  bottomTeamLabel,
  topTeam,
  bottomTeam,
  currentPrediction,
}: KnockoutMatchProps) {
  const matchInfo = matches.find((match) => match.id === id);
  const isStarted = matchInfo ? hasMatchStarted(matchInfo.date_time) : false;
  const isFinished = matchInfo ? hasMatchFinished(matchInfo.date_time) : false;

  const isViewing = preview || isStarted;

  return knockoutMode === "standings" ? (
    <KnockoutMatchStanding
      id={id}
      isStarted={isStarted}
      isFinished={isFinished}
      matchInfo={matchInfo}
      topTeamLabel={topTeamLabel}
      bottomTeamLabel={bottomTeamLabel}
      topTeam={topTeam}
      bottomTeam={bottomTeam}
    />
  ) : isViewing ? (
    <KnockoutMatchView
      id={id}
      isStarted={isStarted}
      isFinished={isFinished}
      matchInfo={matchInfo}
      topTeamLabel={topTeamLabel}
      bottomTeamLabel={bottomTeamLabel}
      topTeam={topTeam}
      bottomTeam={bottomTeam}
      predictedWinner={currentPrediction?.winner}
    />
  ) : (
    <KnockoutMatchEdit
      id={id}
      knockoutMode={knockoutMode}
      topTeamLabel={topTeamLabel}
      bottomTeamLabel={bottomTeamLabel}
      topTeam={topTeam}
      bottomTeam={bottomTeam}
      predictedWinner={currentPrediction?.winner}
    />
  );
}
