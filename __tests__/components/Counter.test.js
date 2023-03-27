// __tests__/components/Counter.test.js

import { render, fireEvent } from "@testing-library/react";
import Counter from "../../components/Counter";

describe("Counter component", () => {
  it("should render the initial count", () => {
    const { getByText } = render(<Counter />);
    expect(getByText("Count: 0")).toBeInTheDocument();
  });

  it("should increment the count when the increment button is clicked", () => {
    const { getByText } = render(<Counter />);
    const incrementButton = getByText("Increment");

    fireEvent.click(incrementButton);

    expect(getByText("Count: 1")).toBeInTheDocument();
  });

  it("should decrement the count when the decrement button is clicked", () => {
    const { getByText } = render(<Counter />);
    const decrementButton = getByText("Decrement");

    fireEvent.click(decrementButton);

    expect(getByText("Count: -1")).toBeInTheDocument();
  });
});
