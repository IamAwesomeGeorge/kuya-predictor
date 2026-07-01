import type { KnockoutScoreInfo } from "../../models/Results";

export default function KnockoutTooltip({ info, n }: { info: KnockoutScoreInfo; n: number }) {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Round</td>
          <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Points</td>
        </tr>
        <tr style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "4px 8px" }}>32</td>
          <td style={{ padding: "4px 8px" }}>
            {info[32]} ({info[32] / n})
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "4px 8px" }}>16</td>
          <td style={{ padding: "4px 8px" }}>
            {info[16]} ({info[16] / n})
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "4px 8px" }}>QF</td>
          <td style={{ padding: "4px 8px" }}>
            {info.QF} ({info.QF / n})
          </td>
        </tr>
        <tr style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "4px 8px" }}>SF</td>
          <td style={{ padding: "4px 8px" }}>
            {info.SF} ({info.SF / n})
          </td>
        </tr>
        <tr>
          <td style={{ padding: "4px 8px" }}>F</td>
          <td style={{ padding: "4px 8px" }}>
            {info.F} ({info.F / n})
          </td>
        </tr>
      </tbody>
    </table>
  );
}
