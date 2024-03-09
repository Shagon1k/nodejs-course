import WithTime from "../withTime";

const TEST_URL = "https://jsonplaceholder.typicode.com/posts/1";

const fetchFromUrl = async (url: string, cb: (...args: any[]) => void) => {
  const response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    throw new Error("Unsuccessful URL fetch.");
  }
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("data", (data) =>
  console.log(`Data received: ${JSON.stringify(data)}`)
);
withTime.on("end", (executionTime) =>
  console.log(`Done with execute, execution time: ${executionTime}ms`)
);

withTime.execute(fetchFromUrl, TEST_URL);

console.log(withTime.rawListeners("end"));
