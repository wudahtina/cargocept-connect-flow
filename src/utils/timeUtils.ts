/**
 * Utility functions for UK timezone handling
 */

/**
 * Gets current UK time (GMT/BST automatically handled)
 */
export function getUKTime(): Date {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/London"}));
  return ukTime;
}

/**
 * Formats UK time as a string
 */
export function formatUKTime(includeSeconds: boolean = true): string {
  const ukTime = getUKTime();
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: false,
    timeZone: 'Europe/London'
  };
  
  return ukTime.toLocaleTimeString('en-GB', options);
}

/**
 * Gets the current UK timezone abbreviation (GMT or BST)
 */
export function getUKTimezone(): string {
  const now = new Date();
  const ukFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    timeZoneName: 'short'
  });
  
  const parts = ukFormatter.formatToParts(now);
  const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value;
  
  return timeZoneName || 'GMT';
}