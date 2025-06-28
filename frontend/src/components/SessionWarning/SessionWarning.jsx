import React, { useState, useEffect, useContext } from 'react';
import { authContext } from '../../context/AuthContext';

const SessionWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { dispatch, lastActivity } = useContext(authContext);

  useEffect(() => {
    if (!lastActivity) return;

    const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before logout
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes total
    const CHECK_INTERVAL = 1000; // Check every second

    const checkSession = () => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      const timeUntilLogout = INACTIVITY_TIMEOUT - timeSinceLastActivity;

      if (timeUntilLogout <= WARNING_TIME && timeUntilLogout > 0) {
        setShowWarning(true);
        setTimeLeft(Math.ceil(timeUntilLogout / 1000));
      } else if (timeUntilLogout <= 0) {
        // Session expired, logout
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        window.location.href = "/login?reason=inactivity";
      } else {
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkSession, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [lastActivity, dispatch]);

  const handleExtendSession = () => {
    dispatch({ type: "UPDATE_ACTIVITY" });
    setShowWarning(false);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Session Timeout Warning
            </h3>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Your session will expire in <span className="font-semibold text-red-600">{timeLeft}</span> seconds due to inactivity.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Would you like to extend your session?
          </p>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={handleExtendSession}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Stay Logged In
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionWarning; 