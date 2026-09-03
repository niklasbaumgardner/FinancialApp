if (window.Sentry) {
  Sentry.onLoad(function () {
    Sentry.init({
      release: "nbbudgetfront@3.0.21",
      environment: "production",
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  });
}
