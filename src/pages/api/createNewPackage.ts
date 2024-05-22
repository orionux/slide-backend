export default async function handler(req: { method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; data?: any; error?: string; }): void; new(): any; }; }; }) {
    if (req.method === 'POST') {
      try {
        const formData = req.body;
        const response = await fetch('http://20.55.55.225:8080/api/consult-packages', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ formData}),
          });
      
          const data = await response.json();
          console.log(data);

        // Send a response back to the client
        res.status(200).json({ message: 'Package created successfully', data: formData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  