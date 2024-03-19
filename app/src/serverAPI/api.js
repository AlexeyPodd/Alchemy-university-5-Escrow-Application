import server from "./server";

const serverAPI = {
  async getContractAddresses() {
    return await server.get('contracts');
  },
  async addContractAddress(address) {
    return await server.post('new-contract', { contract: address });
  }
}

export default serverAPI;