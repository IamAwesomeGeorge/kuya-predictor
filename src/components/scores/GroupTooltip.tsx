import type { GroupScoreInfo } from "../../models/Results";

export default function GroupTooltip({ info }: { info: GroupScoreInfo }) {
  return (
    <table style={{ borderCollapse: "collapse" }}>
      <tbody>
        <tr style={{ borderBottom: "1px solid #ddd" }}>
          <td style={{ padding: "4px 8px", fontWeight: "bold" }}>Groups:</td>
          <td style={{ padding: "4px 8px" }}>{info.GROUPS}</td>
        </tr>
        <tr>
          <td style={{ padding: "4px 8px", fontWeight: "bold" }}>3RD Place:</td>
          <td style={{ padding: "4px 8px" }}>{info.THIRD}</td>
        </tr>
      </tbody>
    </table>
  );
}
