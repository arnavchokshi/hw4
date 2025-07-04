#!/usr/bin/env python3
"""
Blockchain Data Mining Project - Simplified Version
HW4 - Problem 2: Mining Blockchain Dataset

This script implements blockchain data mining using ONLY:
1. Real Ethereum transaction data from Etherscan API
2. Real ETH-USD price data from Alpha Vantage or CryptoCompare
3. Analytics, graphing, and price charting
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
import requests
from datetime import datetime
import warnings
import os
warnings.filterwarnings('ignore')

class BlockchainMiner:
    def __init__(self):
        self.transactions_df = None
        self.price_data = None
        self.selected_addresses = []
        self.address_stats = {}
        self.etherscan_api_key = "9CN6P59BIDD762J6VH63RMQBPGV3NA4T93"
        self.data_source = "Etherscan API"

    def load_data(self, num_transactions=200):
        if os.path.exists('saved_transactions.csv'):
            self.transactions_df = pd.read_csv('saved_transactions.csv', parse_dates=['timestamp'])
            return
        addresses = [
            '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
            '0xE592427A0AEce92De3Edee1F18E0157C05861564',
            '0x28C6c06298d514Db089934071355E5743bf21d60',
            '0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549',
            '0xdfd5293D8e347dFe59E90eFd55f2956a1343963d'
        ]
        txs = []
        for addr in addresses:
            if len(txs) >= num_transactions:
                break
            url = "https://api.etherscan.io/api"
            params = {
                'module': 'account',
                'action': 'txlist',
                'address': addr,
                'startblock': 18000000,
                'endblock': 99999999,
                'page': 1,
                'offset': min(num_transactions // len(addresses), 100),
                'sort': 'desc',
                'apikey': self.etherscan_api_key
            }
            resp = requests.get(url, params=params)
            data = resp.json()
            if data['status'] == '1' and data['result']:
                for tx in data['result']:
                    txs.append({
                        'tx_hash': tx['hash'],
                        'block_number': int(tx['blockNumber']),
                        'timestamp': int(tx['timeStamp']),
                        'from_address': tx['from'],
                        'to_address': tx['to'],
                        'value': float(tx['value']) / 1e18,
                        'gas_price': float(tx['gasPrice']) / 1e9,
                        'gas_used': int(tx['gasUsed'])
                    })
                    if len(txs) >= num_transactions:
                        break
        if txs:
            df = pd.DataFrame(txs)
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
            self.transactions_df = df
            df.to_csv('saved_transactions.csv', index=False)
        else:
            raise Exception("No transactions found for any of the active addresses")

    def _alpha_price(self, days=31):
        url = "https://www.alphavantage.co/query"
        params = {
            'function': 'TIME_SERIES_DAILY',
            'symbol': 'ETHUSD',
            'outputsize': 'compact',
            'datatype': 'json'
        }
        resp = requests.get(url, params=params)
        if resp.status_code == 200:
            data = resp.json()
            if 'Time Series (Daily)' in data:
                ts = data['Time Series (Daily)']
                prices = []
                for date in list(ts.keys())[:days]:
                    d = ts[date]
                    prices.append({
                        'Date': date,
                        'Close': float(d['4. close']),
                        'Volume': float(d['5. volume'])
                    })
                if prices:
                    df = pd.DataFrame(prices)
                    df['Date'] = pd.to_datetime(df['Date'])
                    df.set_index('Date', inplace=True)
                    return df
        raise Exception("Alpha Vantage price data failed")

    def load_price(self, days=31):
        self.price_data = self._alpha_price(days=days)

    def stats(self):
        total_value = self.transactions_df['value'].sum()
        avg_value = self.transactions_df['value'].mean()
        unique_addresses = len(set(self.transactions_df['from_address'].tolist() + self.transactions_df['to_address'].tolist()))
        return {
            'total_transactions': len(self.transactions_df),
            'unique_addresses': unique_addresses,
            'total_value': total_value,
            'average_value': avg_value,
            'data_source': self.data_source,
            'date_range': (self.transactions_df['timestamp'].min(), self.transactions_df['timestamp'].max())
        }

    def top_addresses(self, n=10):
        activity = {}
        for _, tx in self.transactions_df.iterrows():
            for addr in [tx['from_address'], tx['to_address']]:
                if addr not in activity:
                    activity[addr] = {'count': 0, 'value': 0}
                activity[addr]['count'] += 1
                activity[addr]['value'] += tx['value']
        sorted_addrs = sorted(activity.items(), key=lambda x: x[1]['count'], reverse=True)
        self.selected_addresses = [addr for addr, _ in sorted_addrs[:n]]
        self.address_stats = {addr: stats for addr, stats in sorted_addrs[:n]}
        return self.selected_addresses

    def make_graph(self):
        G = nx.DiGraph()
        for addr in self.selected_addresses:
            G.add_node(addr, **self.address_stats[addr])
        for _, row in self.transactions_df.iterrows():
            if (row['from_address'] in self.selected_addresses and row['to_address'] in self.selected_addresses):
                if G.has_edge(row['from_address'], row['to_address']):
                    G[row['from_address']][row['to_address']]['weight'] += row['value']
                    G[row['from_address']][row['to_address']]['count'] += 1
                else:
                    G.add_edge(row['from_address'], row['to_address'], weight=row['value'], count=1)
        stats = {
            'nodes': G.number_of_nodes(),
            'edges': G.number_of_edges(),
            'density': nx.density(G),
            'clustering': nx.average_clustering(G)
        }
        return G, stats

    def plot_graph(self, G):
        plt.figure(figsize=(12, 8))
        pos = nx.spring_layout(G, k=1, iterations=50)
        node_sizes = [G.nodes[node]['count'] * 30 for node in G.nodes()]
        nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color='lightblue', alpha=0.7)
        if G.number_of_edges() > 0:
            edge_weights = [G[u][v]['weight'] for u, v in G.edges()]
            nx.draw_networkx_edges(
                G, pos,
                width=[max(w/20, 1.5) for w in edge_weights],
                edge_color='gray',
                alpha=0.8,
                arrows=True,
                arrowstyle='-|>',
                min_source_margin=15,
                min_target_margin=15,
                connectionstyle='arc3,rad=0.1'
            )
        labels = {node: f"{node[:8]}..." for node in G.nodes()}
        nx.draw_networkx_labels(G, pos, labels, font_size=8)
        plt.title("Real Blockchain Address Relationship Graph", fontsize=14, fontweight='bold')
        plt.axis('off')
        plt.tight_layout()
        plt.savefig('blockchain_graph.png', dpi=300, bbox_inches='tight')
        plt.show()

    def plot_price(self):
        if self.price_data is None or len(self.price_data) == 0:
            return
        plt.figure(figsize=(12, 6))
        plt.plot(self.price_data.index, self.price_data['Close'], linewidth=2, color='blue', alpha=0.8)
        plt.title('ETH-USD Price Trend (Real Data)', fontsize=14, fontweight='bold')
        plt.xlabel('Date', fontsize=12)
        plt.ylabel('Price (USD)', fontsize=12)
        plt.grid(True, alpha=0.3)
        plt.gca().yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'${x:,.0f}'))
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig('eth_price_chart.png', dpi=300, bbox_inches='tight')
        plt.show()

    def price_corr(self):
        daily_volume = self.transactions_df.groupby(
            self.transactions_df['timestamp'].dt.date
        )['value'].sum()
        if len(self.price_data) > 0:
            price_daily = self.price_data['Close'].resample('D').last()
            common_dates = set(daily_volume.index) & set(price_daily.index)
            if len(common_dates) > 5:
                correlation = np.corrcoef(
                    [daily_volume[date] for date in common_dates],
                    [price_daily[date] for date in common_dates]
                )[0, 1]
                return {
                    'correlation': correlation,
                    'avg_daily_volume': daily_volume.mean(),
                    'high_volume_days': len(daily_volume[daily_volume > daily_volume.mean() * 1.5])
                }
        return {
            'avg_daily_volume': daily_volume.mean(),
            'high_volume_days': len(daily_volume[daily_volume > daily_volume.mean() * 1.5])
        }

    def run(self):
        self.load_data(200)
        try:
            self.load_price(31)
            price_data_success = True
        except Exception:
            self.price_data = None
            price_data_success = False
        stats = self.stats()
        self.top_addresses(10)
        G, graph_stats = self.make_graph()
        self.plot_graph(G)
        if price_data_success and self.price_data is not None:
            self.plot_price()
            prediction_results = self.price_corr()
        else:
            prediction_results = None
        return {
            'statistics': stats,
            'graph_stats': graph_stats,
            'prediction_results': prediction_results
        }

if __name__ == "__main__":
    miner = BlockchainMiner()
    results = miner.run() 