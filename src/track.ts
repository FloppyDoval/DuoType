import * as excess from "web-excess";

import { getLoggedInUserId } from "api/user";

excess.init();
excess.setDebug(process.env.EXCESS_MODE === "debug");

try {
  excess.identify(`${getLoggedInUserId()}`);
} catch (ex) {
  // Logged out
}

interface TrackingEvents {
  my_event: {
    my_property: string;
  };
}

const track = <T extends keyof TrackingEvents>(
  event: T,
  props?: TrackingEvents[T],
) =>
  new Promise<void>(resolve => {
    excess.track(event, props, () => resolve);
  });

export default track;
