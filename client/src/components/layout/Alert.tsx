import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { RootState } from "../../reducers";

const Alert = () => {
  const alerts: any = useSelector((state: RootState) => state.alert);

  const alertMessage = alerts.map((alert: any) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

  return <>{alertMessage}</>;
};

Alert.propTypes = {
  alerts: PropTypes.array,
};

export default Alert;
