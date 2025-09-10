function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-foreground">
            🍽️ AI Restaurant
          </h1>
          <p className="text-muted-foreground mt-2">
            Din AI-drivna meny & beställningsassistent
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Välkommen till AI Restaurant!
          </h2>
          <p className="text-muted-foreground">
            Här kommer snart vår intelligenta menyassistent att hjälpa dig 
            hitta den perfekta måltiden baserat på dina preferenser.
          </p>
          
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">📋 Kommande funktioner:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Visa restaurangens meny</li>
                <li>• AI-assistent för matfrågor</li>
                <li>• Personliga rekommendationer</li>
                <li>• Digital varukorg</li>
                <li>• Beställningsstatus</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App