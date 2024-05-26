export default async function handler(req: { method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; details?: any; message?: string; data?: any; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
      try {
          const formData = req.body;

          const response = await fetch('http://localhost:3001/services-packages', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (!response.ok) {
              const errorData = await response.json();
              console.error('Error from server:', errorData);
              
              return res.status(response.status).json({ error: 'Error from server', details: errorData });
          }

          const data = await response.json();
          console.log('Form data:', data);

          // Send a response back to the client
          res.status(200).json({ message: 'Package created successfully', data: data });
      } catch (error) {
          console.error('Fetch error:', error);
          res.status(500).json({ error: 'Internal Server Error', details: error });
      }
  } else {
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
