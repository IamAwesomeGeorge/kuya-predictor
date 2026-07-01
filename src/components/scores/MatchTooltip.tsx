import type { MatchScoreInfo } from "../../models/Results";

export default function MatchTooltip({ info }: { info: MatchScoreInfo }) {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Round</td>
            <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Points</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>Group</td>
            <td style={{ padding: "4px 8px" }}>{info.G}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>32</td>
            <td style={{ padding: "4px 8px" }}>{info[32]}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>16</td>
            <td style={{ padding: "4px 8px" }}>{info[16]}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>QF</td>
            <td style={{ padding: "4px 8px" }}>{info.QF}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>SF</td>
            <td style={{ padding: "4px 8px" }}>{info.SF}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 8px" }}>F</td>
            <td style={{ padding: "4px 8px" }}>{info.F}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Conditions</td>
            <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Points</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>Winner</td>
            <td style={{ padding: "4px 8px" }}>{info.WIN}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>Score</td>
            <td style={{ padding: "4px 8px" }}>
              {info.SCORE} ({info.SCORE / 3})
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "4px 8px" }}>GD</td>
            <td style={{ padding: "4px 8px" }}>{info.GD}</td>
          </tr>
          <tr>
            <td style={{ padding: "4px 8px" }}>First Score</td>
            <td style={{ padding: "4px 8px" }}>{info.FIRST}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
