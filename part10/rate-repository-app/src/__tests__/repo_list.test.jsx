import { render, screen, within } from "@testing-library/react-native";
import { prettyDOM } from "@testing-library/dom";
import { RepositoryListContainer } from "../components/RepositoryList";

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
  },
  edges: [
    {
      node: {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
      },
      cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
    },
    {
      node: {
        id: "async-library.react-async",
        fullName: "async-library/react-async",
        description: "Flexible promise-based React data loader",
        language: "JavaScript",
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
      },
      cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
    },
  ],
};

const repoNodes = repositories.edges.map((e) => e.node);

const getParentView = (element) => {
  let parent = element.parent;
  while (parent && parent.type !== "View") {
    parent = parent.parent;
  }
  return parent;
};

describe("Repository list", () => {
  // we avoid using test-id and try to rely on user-visible input such as text for the tests
  (it("renders all repos' headers", () => {
    render(<RepositoryListContainer repositories={repositories} />);
    for (let repo of repoNodes) {
      const nameEntry = screen.getByText(repo.fullName);
      expect(nameEntry).toBeOnTheScreen();
      const headerContainer = getParentView(nameEntry);
      expect(
        within(headerContainer).getByText(repo.description),
      ).toBeOnTheScreen();
      expect(
        within(headerContainer).getByText(repo.language),
      ).toBeOnTheScreen();
    }
  }),
    it("renders all repos' statistics", () => {
      render(<RepositoryListContainer repositories={repositories} />);
      const getStatContainers = (statName) =>
        screen.getAllByText(statName).map((header) => getParentView(header));

      const stats = [
        { name: "reviews", key: "reviewCount" },
        { name: "rating", key: "ratingAverage" },
        { name: "forks", key: "forksCount" },
        { name: "stars", key: "stargazersCount" },
      ];

      for (let stat of stats) {
        let statContainers = getStatContainers(stat.name);
        for (let i = 0; i < repoNodes.length; i++) {
          let expectedData = repoNodes[i][stat.key];
          expect(
            within(statContainers[i]).getByText(
              expectedData >= 1000
                ? `${(expectedData / 1000).toFixed(1)}k`
                : expectedData.toString(),
            ),
          ).toBeOnTheScreen();
        }
      }
    }));
});
