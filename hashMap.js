const HashMap = () => {
    const initialNumberOfBuckets = 10;
    let numberOfBuckets = initialNumberOfBuckets;
    const buckets = Array(numberOfBuckets).fill(null).map(() => []);

    const loadFactorThreshold = 0.7;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    };

    function getIndex(key) {
        const hashCode = hash(key);
        const index = hashCode % numberOfBuckets;
        return index;
    }

    function resize() {
        const oldBuckets = buckets;
        numberOfBuckets = numberOfBuckets * 2;
        buckets.length = 0;
        buckets.push(...Array(numberOfBuckets).fill(null).map(() => []));

        oldBuckets.forEach(bucket => {
            bucket.forEach(entry => {
                const index = getIndex(entry.key);
                buckets[index].push(entry);
            });
        });
    }

    function set(key, value) {
        const index = getIndex(key);
        const bucket = buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value;
                return;
            }
        }

        bucket.push({ key, value });

        if (length() / numberOfBuckets > loadFactorThreshold) {
            resize();
        }
    }

    function get(key) {
        const index = getIndex(key);
        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                return bucket[i].value;
            }
        }
        return null;
    }

    function has(key) {
        const index = getIndex(key);
        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                return true;
            }
        }
        return false;
    }

    function remove(key) {
        const index = getIndex(key);
        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function length() {
        let count = 0;
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            count += bucket.length;
        }
        return count;
    }

    function clear() {
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = [];
        }
    }

    function keys() {
        const listOfKeys = [];
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                listOfKeys.push(bucket[j].key);
            }
        }
        return listOfKeys;
    }

    function values() {
        const listOfValues = [];
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                listOfValues.push(bucket[j].value);
            }
        }
        return listOfValues;
    }

    function entries() {
        const listOfEntries = [];
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                listOfEntries.push([bucket[j].key, bucket[j].value]);
            }
        }
        return listOfEntries;
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    };
};

export default HashMap;
