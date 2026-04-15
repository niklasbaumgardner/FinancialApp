if (window.Sentry) {
  Sentry.onLoad(function () {
    Sentry.init({
      release: "nb-budgets@2.2.8",
      environment: "production",
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 1.0,
      sendDefaultPii: true,
    });
  });
}
