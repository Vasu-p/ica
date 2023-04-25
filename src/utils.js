export function getPropertyIdsForCommunities(communities) {
  return communities.flatMap((community) => community.osPropertyIds);
}
