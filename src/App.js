import React, { useState } from 'react';

// --- Helper Components for Styling and Structure ---

// A reusable card component for displaying statistics with an interactive tooltip
const StatCard = ({ title, value, description, tooltipText, small = false }) => (
  <div className={`group relative bg-slate-50 rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200 ${small ? 'text-center' : ''}`}>
    <p className={`text-sm font-medium text-cyan-700 uppercase tracking-wider ${small ? 'mb-1' : 'mb-2'}`}>{title}</p>
    <p className={`font-bold text-slate-800 ${small ? 'text-2xl' : 'text-3xl'}`}>{value}</p>
    {description && <p className="text-slate-500 mt-2 text-xs">{description}</p>}
    {tooltipText && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-xs text-white bg-slate-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        {tooltipText}
      </div>
    )}
  </div>
);

// A reusable section component with interactive hover effects
const Section = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="group text-3xl font-bold text-slate-800 mb-6 flex items-center cursor-default">
      <span className="bg-left-bottom bg-gradient-to-r from-cyan-500 to-cyan-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
        {title}
      </span>
    </h2>
    <div className="space-y-4 text-slate-600 leading-relaxed text-base">
      {children}
    </div>
  </section>
);

// A simple tab component to organize detailed stats
const Tabs = ({ tabs, activeTab, setActiveTab }) => (
    <div className="border-b border-slate-200 mb-6">
        <nav className="-mb-px flex space-x-2 sm:space-x-6 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`${
                        activeTab === tab.name
                            ? 'border-cyan-500 text-cyan-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    } whitespace-nowrap py-4 px-2 sm:px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
                >
                    {tab.name}
                </button>
            ))}
        </nav>
    </div>
);

// New component for the Top 10 Addresses Table
const TopAddressesTable = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Transactions</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Value (ETH)</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
                {data.map((row) => (
                    <tr key={row.rank} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.rank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono" title={row.address}>
                            {`${row.address.substring(0, 8)}...${row.address.substring(row.address.length - 6)}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.transactions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.totalValue.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// New component for displaying code snippets
const CodeSnippet = ({ code, language = 'python' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden my-4 md:my-0 relative h-full">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-slate-600 hover:bg-slate-500 text-white text-xs font-semibold py-1 px-2 rounded z-10"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
            <pre className="p-4 text-sm text-white overflow-x-auto h-full">
                <code className={`language-${language}`}>{code}</code>
            </pre>
        </div>
    );
};


// --- Main Application Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Transactions');
  const [selectedMethodologyStep, setSelectedMethodologyStep] = useState(1);

  // Placeholder for image URLs.
  const blockchainGraphUrl = 'https://placehold.co/800x450/e2e8f0/334155?text=My+Blockchain+Network+Graph';
  const ethPriceChartUrl = 'https://placehold.co/800x450/e2e8f0/334155?text=My+ETH-USD+Price+Chart';

  const analyticsTabs = [
      { name: 'Transactions' },
      { name: 'Top Addresses' },
      { name: 'Gas Usage' },
      { name: 'Price Data' },
  ];
  
  const topAddressesData = [
    { rank: 1, address: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', transactions: 40, totalValue: 9.57 },
    { rank: 2, address: '0xe592427a0aece92de3edee1f18e0157c05861564', transactions: 40, totalValue: 0.01 },
    { rank: 3, address: '0xf5213a6a2f0890321712520b8048d9886c1a9900', transactions: 33, totalValue: 0.00 },
    { rank: 4, address: '0xb4897d49c5859b9bb5e3d6c4372bdd83d55c8d6c', transactions: 3, totalValue: 0.00 },
    { rank: 5, address: '0x67d729ef227c53eb758c1b4b6e0e540d77f4bfc1', transactions: 1, totalValue: 0.02 },
    { rank: 6, address: '0xb5947550d0e5ddc1ad479935a4ea4f08f01f6a1d', transactions: 1, totalValue: 0.00 },
    { rank: 7, address: '0xfe96ade32d7407c8d8c8ef25ecc558cf4744934f', transactions: 1, totalValue: 0.03 },
    { rank: 8, address: '0xbf2f6981c7a8c34590a2f15491235ad162eb51a5', transactions: 1, totalValue: 0.00 },
    { rank: 9, address: '0x962a7ea7b86ba5d71c0c41984cb1d8d059e21e6b', transactions: 1, totalValue: 0.01 },
    { rank: 10, address: '0x3a1b92a5dc06343ff9c6318d7c4b36b042a980db', transactions: 1, totalValue: 0.00 },
  ];
  
  const methodologySteps = [
    {
      id: 1,
      title: 'Data Extraction',
      description: 'I used two separate APIs for this project: the Etherscan API to get a list of 80 recent transactions, and the Alpha Vantage API to get daily ETH-USD price data.',
      code: `def load_data(self, num_transactions=200):
    # Fetches transaction data from Etherscan API
    # ... implementation ...

def load_price(self, days=31):
    # Fetches price data from Alpha Vantage API
    # ... implementation ...

def run(self):
    self.load_data(200)
    try:
        self.load_price(31)
        price_data_success = True
    except Exception:
        self.price_data = None
        price_data_success = False
    # ...`
    },
    {
      id: 2,
      title: 'Data Cleaning',
      description: 'I converted raw data into usable formats, such as changing timestamps to datetime objects and transaction values from Wei to ETH, and filtered out any malformed records.',
      code: `def load_data(...):
    # ... (inside the loop processing transactions)
    txs.append({
        # ...
        'value': float(tx['value']) / 1e18, # Wei to ETH
        'gas_price': float(tx['gasPrice']) / 1e9, # Wei to Gwei
        # ...
    })
    # ...
    df = pd.DataFrame(txs)
    df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
    self.transactions_df = df`
    },
    {
      id: 3,
      title: 'In-Depth Analytics',
      description: 'I computed a wide range of descriptive statistics for transaction values, gas usage, and timing. I then identified the top 10 most active addresses for my network analysis.',
      code: `def stats(self):
    total_value = self.transactions_df['value'].sum()
    avg_value = self.transactions_df['value'].mean()
    # ... more stats
    return { ... }

def top_addresses(self, n=10):
    # ... logic to count and sort addresses by activity
    return self.selected_addresses`
    },
    {
      id: 4,
      title: 'Graph Construction',
      description: 'I used NetworkX to build a directed graph of the top 10 addresses, with edges weighted by the total ETH transferred.',
      code: `def make_graph(self):
    G = nx.DiGraph()
    for addr in self.selected_addresses:
        G.add_node(addr, **self.address_stats[addr])
    
    for _, row in self.transactions_df.iterrows():
        if (row['from_address'] in self.selected_addresses and 
            row['to_address'] in self.selected_addresses):
            # ... logic to add/update edges
    return G, { ... graph stats ... }`
    },

  ];
  
  const challengesCode = `
# Part of the data fetching function
params = {
    'module': 'account',
    'action': 'txlist',
    'address': addr,
    'startblock': 18000000, # Locked start block
    'endblock': 99999999,   # Essentially 'latest'
    'sort': 'desc',
    'apikey': self.etherscan_api_key
}
  `;

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        
        <header className="text-center my-12">
          <h1 className="text-5xl font-extrabold text-slate-800 tracking-tight">
            Decoding the Chain
          </h1>
          <p className="text-lg text-cyan-700 mt-4">
            A Deep Dive into My Ethereum Project
          </p>
        </header>

        <Section title="HW4 Overview">
          <p>This week I decided to do programming assignment option 2. I was very excited to start learning more about block chain and as i dove deeper I enjoyed it more and more. Overall, I went it thinking it was be pretty straight forward. I would first grab a larger databased of recent transactions, clean up the data, and then start digging for interesting patterns. I was especially curious to see if I could find any connection between the large companies buying certain crypos adn theri effect of crypto prices. All of this was way easier said than done and I found a lot fo errors and bugs through my process. Eventually I came up with a solution I was happy with. Using Etherscan for the raw transaction details and Alpha Vantage for the daily price info. I was able to get a decently sized database and make interesting conlsuions from it.</p>
        </Section>
        
        <Section title="Methodology: My Step-by-Step Process">
            <p>Bellow I have layed out my step by step appraoch, moving from data extraction and cleaning to in-depth analysis and visualization. Click on any step below to see the the Python code I used on the right.</p>
            <div className="mt-6 md:grid md:grid-cols-5 md:gap-8">
                <div className="md:col-span-2 space-y-2">
                  {methodologySteps.map(step => (
                    <div key={step.id} 
                         onClick={() => setSelectedMethodologyStep(step.id)}
                         className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${selectedMethodologyStep === step.id ? 'bg-cyan-100 border-l-4 border-cyan-500 shadow' : 'bg-white hover:bg-slate-50 border'}`}>
                      <h3 className="font-bold text-slate-700">Step {step.id}: {step.title}</h3>
                      <p className="text-sm mt-1">{step.description}</p>
                    </div>
                  ))}
                </div>
                <div className="md:col-span-3">
                  {methodologySteps.find(step => step.id === selectedMethodologyStep) && (
                    <CodeSnippet code={methodologySteps.find(step => step.id === selectedMethodologyStep).code} />
                  )}
                </div>
            </div>
        </Section>

        <Section title="In-Depth Analytics">
            <p>I dove deep into the data to uncover patterns in transaction values, gas fees, network structure, and price movements. The transaction data was collected over a period of about 28 minutes on July 4, 2025.</p>
            <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg border">
                <Tabs tabs={analyticsTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="pt-4">
                    {activeTab === 'Transactions' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard small title="Total Txs" value="80" tooltipText="The total number of transactions in my dataset." />
                            <StatCard small title="Unique Addresses" value="48" tooltipText="The number of unique sender/receiver addresses in the time window." />
                            <StatCard small title="Total Value" value="9.58 ETH" tooltipText="The sum of all ETH transferred." />
                            <StatCard small title="Max Value" value="9.57 ETH" tooltipText="This single transaction accounted for almost all the value." />
                            <StatCard small title="Mean Value" value="0.12 ETH" tooltipText="The average is skewed by the one large transaction." />
                            <StatCard small title="Median Value" value="0.00 ETH" description="Most txs are small contract interactions." tooltipText="This shows the network is dominated by non-value transfers." />
                            <StatCard small title="Std. Deviation" value="~1.07 ETH" tooltipText="A high standard deviation points to a wide spread in transaction values." />
                            <StatCard small title="Txs / Minute" value="~2.9" tooltipText="Transaction activity was bursty, not constant." />
                        </div>
                    )}
                    {activeTab === 'Top Addresses' && (
                        <TopAddressesTable data={topAddressesData} />
                    )}
                    {activeTab === 'Gas Usage' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard small title="Mean Gas Price" value="~55 Gwei" tooltipText="Gwei is a smaller denomination of ETH used for gas fees." />
                            <StatCard small title="Median Gas Price" value="55 Gwei" />
                            <StatCard small title="Min Gas Used" value="21,000" tooltipText="This is the standard amount for a simple ETH transfer." />
                            <StatCard small title="Max Gas Used" value="100,000" tooltipText="Higher gas usage typically means a more complex smart contract interaction." />
                            <StatCard small title="Mean Gas Used" value="~60,000" />
                            <StatCard small title="Median Gas Used" value="60,000" />
                        </div>
                    )}
                    {activeTab === 'Price Data' && (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard small title="Data Points" value="32 Days" tooltipText="I pulled over a month's worth of daily closing prices."/>
                            <StatCard small title="Latest Price" value="$2,479.55" />
                            <StatCard small title="Highest Price" value="$2,816.15" />
                            <StatCard small title="Lowest Price" value="$2,228.57" />
                            <StatCard small title="Average Price" value="$2,510.80" />
                            <StatCard small title="Std. Deviation" value="~$170" tooltipText="A measure of the price volatility over the period."/>
                             
                        </div>
                    )}
                </div>
            </div>
        </Section>

        <Section title="Visual Evidence">
            <div className="mt-8 space-y-12">
            <figure>
              <img src={blockchainGraphUrl} alt="A network graph showing connections between top 10 Ethereum addresses." className="rounded-lg shadow-xl w-full h-auto border-4 border-white" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x450/e2e8f0/334155?text=Error+Loading+Image'; }} />
              <figcaption className="text-center text-sm text-slate-500 mt-4">My graph of the top 10 most active Ethereum addresses. Note the few direct connections between major players.</figcaption>
            </figure>
            <figure>
              <img src={ethPriceChartUrl} alt="A line chart showing the daily price of ETH in USD over the past month." className="rounded-lg shadow-xl w-full h-auto border-4 border-white" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x450/e2e8f0/334155?text=Error+Loading+Image'; }} />
              <figcaption className="text-center text-sm text-slate-500 mt-4">ETH-USD price fluctuations over the last 32 days, showing the market's recent volatility.</figcaption>
            </figure>
          </div>
        </Section>
        
        <Section title="Errors and takeways">
            <p>I had a lot of debugging errors when going through this project. For one, a lot of crypto API's are paid, which makes sense. Trying to find free large source data was challenging and I ended up having to limit myself and use a pretty small dataset of only about 80 transactions.</p>
            <p>Another challenge I ran into was data consistency. Early on, I was making a new API call every day, which meant my data for transactions was always changing. This was cool to see how changes were happening, but ultimately when making a submission I need consistent data. I quickly realized I had to lock in a specific date and time range for my data queries, which you can see in the API parameters I used:</p>
            <CodeSnippet code={challengesCode} />
            <p>The iterative process of debugging, redesigning, and refining my visualization was challenging, but rewarding. Something that was interesting to see was how heavily skewed real Ethereum networks are. There are many small nodes but some address nodes are very large.</p>
        </Section>

      </main>
    </div>
  );
} 