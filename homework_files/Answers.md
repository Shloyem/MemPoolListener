1. Done in code.
2. Done in code.
3. Ideas how to mitigate MEV & front running:
	3.1. Proposer Builder Separation (PBS): Split the roles of validators/builders so that the centralisation forces of MEV are contained in builder layer.
	3.2. Use MEV-Boost (Flashbots): Mev-Boost is an offchain implementation of PBS
	3.3. Use Verifiable Delay Functions: in order to prevent gaming of transaction ordering, as Solana has done on its base layer to ensure transactions are ordered by time of arrival. 
	3.4. Delegate ordering to something like Chainlink’s Fair Sequencing Service (FSS)
4. Done.
