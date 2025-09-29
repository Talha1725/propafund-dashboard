import StatusCard from "../common/status-card";

export default function StatusCardSection() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard active={true} title="Balance" value="$52,300" />
      <StatusCard active={false} title="Deposits" value="$52,300" />
      <StatusCard active={false} title="WITHdrawals" value="$52,300" />
      <StatusCard active={false} title="Passed Challenges" value="$52,300" />
    </div>
  );
}
