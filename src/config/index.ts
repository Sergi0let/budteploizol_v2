const config = {
  env: {
    apiUrl: process.env.NEXT_PUBLIC_URL!,
    novaPoshta: {
      apiKey: process.env.NOVA_POSHTA_API_KEY!,
      apiEndpoint: process.env.NOVA_POSHTA_URL!,
    },
    mail: {
      user: process.env.GMAIL_USER!,
      appPassword: process.env.GMAIL_APP_PASSWORD!,
    },
  }
}

export default config