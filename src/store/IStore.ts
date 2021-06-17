import StoreCallback from '../types/StoreCallback';
import IEntityType from '../util/IEntityType';

abstract class IStore<K, V> {
	valueFunction: StoreCallback<K, V> = null;
	expire: number = 86400000;
	timeoutCallback: StoreCallback<K, V> = null;
	limit: () => Promise<boolean> = null;
	valueType: IEntityType<V> = null;

	protected keyCode(key: K): string {
		if (key == null) {
			throw new Error('Invalid Key');
		} else if (typeof key == 'string' || typeof key == 'number' || typeof key == 'boolean' || typeof key == 'symbol') {
			return key.toString();
		} else {
			return JSON.stringify(key);
		}
	}

	abstract get(key: K): Promise<V>;
	abstract put(key: K, val: V, expire?: number, timeoutCallback?: StoreCallback<K, V>): Promise<boolean>;
	abstract del(key: K): Promise<boolean>;
	abstract clear(): void;
	abstract size(): Promise<number>;
	abstract keys(): Promise<Array<K>>;
}

export default IStore;
