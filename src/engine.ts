/** Fictional simulation. Not an animal behavior assessment or care recommendation. */
namespace GerbilIndex {
  export const metrics = ['Strategic plotting', 'Destructive nibbling', 'Escape ambition', 'Quiet contempt'] as const;
  export type Level = 'Low' | 'Elevated' | 'High' | 'Critical';
  export interface Gerbil {
    id: string; name: string; kind: 'Species' | 'Coat variety'; scientificName: string; identity: string; source: string; sourceLabel: string; alias: string; concern: string; description: string;
    factors: number[]; adjustment: number; portrait: string;
    evidence: string[]; alibi: string; secret: string;
  }
  export interface Incident { id: string; subjectId: string; text: string; delta: number; }
  export interface State { gerbils: Gerbil[]; incidents: Incident[]; }
  export const behaviors = [
    { id: 'meeting', label: 'Held an unauthorized tube meeting', delta: 6 },
    { id: 'stare', label: 'Maintained unsettling eye contact', delta: 4 },
    { id: 'paper', label: 'Ate a document relating to this investigation', delta: 8 },
    { id: 'dig', label: 'Dug without a permit', delta: 5 },
    { id: 'sleep', label: 'Was asleep. Suspiciously peacefully.', delta: 1 },
    { id: 'cleared', label: 'Allegation disproved. Analyst mildly embarrassed.', delta: -5 }
  ] as const;
  const records: Gerbil[] = [
  {
    "id": "T-001",
    "name": "Great gerbil",
    "kind": "Species",
    "scientificName": "Rhombomys opimus",
    "alias": "Species / Rhombomys opimus",
    "concern": "Self-appointed upper management.",
    "description": "Put \"Great\" in the species name before anyone completed a performance review. Now requests a corner burrow and an executive seed allowance.",
    "identity": "A gerbil species in the genus Rhombomys.",
    "source": "https://animaldiversity.org/accounts/Rhombomys_opimus/",
    "sourceLabel": "Animal Diversity Web",
    "factors": [
      100,
      98,
      96,
      98
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Reclassified the food bowl as a regional headquarters.",
      "Charged the wheel a consulting fee.",
      "Promoted an ordinary hole to Senior Hole."
    ],
    "alibi": "Great is a name, not a job title.",
    "secret": "The promotion was approved by the same gerbil."
  },
  {
    "id": "T-002",
    "name": "Mongolian gerbil",
    "kind": "Species",
    "scientificName": "Meriones unguiculatus",
    "alias": "Species / Meriones unguiculatus",
    "concern": "Unlicensed underground infrastructure.",
    "description": "The bureau has classified an ordinary tunnel as a transport ministry. The second tunnel has been referred to the competition regulator.",
    "identity": "A gerbil species also called the Mongolian jird.",
    "source": "https://animaldiversity.org/accounts/Meriones_unguiculatus/",
    "sourceLabel": "Animal Diversity Web",
    "factors": [
      94,
      92,
      90,
      92
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Filed a planning application after eating the planning office.",
      "The tunnel has a tunnel. Neither has a permit.",
      "Declared the cardboard tube an independent transit authority."
    ],
    "alibi": "It is a hole.",
    "secret": "The master plan is another hole."
  },
  {
    "id": "T-003",
    "name": "Fat-tailed gerbil",
    "kind": "Species",
    "scientificName": "Pachyuromys duprasi",
    "alias": "Species / Pachyuromys duprasi",
    "concern": "Undeclared strategic tail reserves.",
    "description": "The tail has been entered on the bureau balance sheet as a suspicious asset. Attempts to appoint an auditor have been met with a nap.",
    "identity": "Also known as the duprasi; this species has a short, thick tail that stores fat.",
    "source": "https://animaldiversity.org/accounts/Pachyuromys_duprasi/",
    "sourceLabel": "Animal Diversity Web",
    "factors": [
      88,
      86,
      84,
      86
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Failed to itemize tail contents.",
      "Applied for a second tail under capital expenditure.",
      "Listed sleeping as a quarterly growth strategy."
    ],
    "alibi": "That is just my tail.",
    "secret": "The reserves are fat. The conspiracy is ours."
  },
  {
    "id": "T-004",
    "name": "Black",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Unlicensed stealth coating.",
    "description": "The bureau spent its entire surveillance budget pointing a camera into a shadow. The resulting footage has been classified as very convincing.",
    "identity": "An even black coat variety with black eyes.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      84,
      82,
      80,
      82
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Matched the color of its own redacted case file.",
      "Attended a black-tie event without changing.",
      "Blamed a missing seed on poor visibility."
    ],
    "alibi": "You could turn the light on.",
    "secret": "Night vision was not in the procurement budget."
  },
  {
    "id": "T-005",
    "name": "Siamese",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Unauthorized use of cat branding.",
    "description": "Beige coat, dark points, suspiciously familiar name. The bureau has opened a trademark dispute that neither cats nor gerbils understand.",
    "identity": "A beige colorpoint variety with darker extremities and black eyes.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      77,
      75,
      73,
      75
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Listed \"possibly a tiny cat\" under qualifications.",
      "Requested a cat-sized food budget.",
      "Declined to meow on legal advice."
    ],
    "alibi": "There is more than one animal with this color name.",
    "secret": "The trademark lawyer is also a gerbil."
  },
  {
    "id": "T-006",
    "name": "Burmese",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Hostile acquisition of the smaller tube.",
    "description": "The bureau has mistaken a shaded coat for an expensive suit. An ordinary nibble is now a restructuring exercise. Three cardboard jobs are at risk.",
    "identity": "A shaded colorpoint variety with darker points and black eyes.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      69,
      67,
      65,
      67
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Renamed a seed pile \"the portfolio\".",
      "Referred to chewing as operational streamlining.",
      "Announced a merger with a cereal box."
    ],
    "alibi": "I have no understanding of corporate finance.",
    "secret": "Neither does the bureau."
  },
  {
    "id": "T-007",
    "name": "Golden Agouti",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Plausible deniability in standard equipment.",
    "description": "Looks exactly like the gerbil the bureau expected. This has somehow made identification harder. Every lineup ends with \"yes, one of those\".",
    "identity": "A gold-toned, black-ticked coat variety with a white belly and black eyes.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      63,
      61,
      59,
      61
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Blended into a lineup of other gerbils.",
      "Submitted \"gerbil-colored\" as a description.",
      "The sketch artist drew the bureau mascot again."
    ],
    "alibi": "I came like this.",
    "secret": "The identity parade is just a group photo."
  },
  {
    "id": "T-008",
    "name": "Nutmeg",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Attempted entry under a pantry alias.",
    "description": "The spice inventory now contains one moving item. Nobody can prove a breach, but the flour has requested a transfer.",
    "identity": "A dark, gold-toned variety with strong black ticking and no white belly.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      46,
      44,
      42,
      44
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Was filed between cinnamon and cloves.",
      "Denied all involvement in the missing recipe.",
      "Rejected a measuring spoon on jurisdictional grounds."
    ],
    "alibi": "A color name is not an ingredient.",
    "secret": "Do not put a gerbil in a recipe. This should not need saying."
  },
  {
    "id": "T-009",
    "name": "Lilac",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Branding that has not delivered purple.",
    "description": "The bureau expected a purple gerbil and received paperwork about gray fur. A consumer complaint has been opened against the concept of color naming.",
    "identity": "A gray coat variety with ruby eyes, despite its purple-sounding name.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      29,
      27,
      25,
      27
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Failed a paint-swatch comparison.",
      "Offered no explanation for the name.",
      "Declined the bureau's proposed rebrand to \"Gray Again\"."
    ],
    "alibi": "I did not name the variety.",
    "secret": "The investigator has also complained that blueberries are not blue enough."
  },
  {
    "id": "T-010",
    "name": "Dove",
    "kind": "Coat variety",
    "scientificName": "Meriones unguiculatus",
    "alias": "Coat variety / Meriones unguiculatus",
    "concern": "Suspiciously effective peace branding.",
    "description": "A name with excellent public relations. The bureau has found no plot, no manifesto, and no wings. It is investigating the absence of a scandal.",
    "identity": "A light gray coat variety with ruby eyes.",
    "source": "https://gerbils.co.uk/gerbil-show-standards/",
    "sourceLabel": "National Gerbil Society",
    "factors": [
      11,
      9,
      7,
      9
    ],
    "adjustment": 0,
    "portrait": "bureau-gerbil",
    "evidence": [
      "Borrowed the name of a peace-associated bird.",
      "Failed to issue a declaration of war.",
      "Continued being a gerbil throughout negotiations."
    ],
    "alibi": "It is a coat color.",
    "secret": "Case closed. The committee would like a seed."
  }
];
  export function initialState(): State {
    return { gerbils: records.map(g => ({...g, factors:[...g.factors], evidence:[...g.evidence]})), incidents: [
      {id:'INC-003', subjectId:'T-001', text:'Great gerbil classification requested an executive parking space.', delta:0},
      {id:'INC-002', subjectId:'T-002', text:'Mongolian gerbil tunnel declared an unauthorized railway.', delta:0},
      {id:'INC-001', subjectId:'T-004', text:'Black coat mistaken for a redaction. Analyst apologizes to the shadow.', delta:0}
    ]};
  }
  export function score(g: Pick<Gerbil,'factors'|'adjustment'>): number {
    if (g.factors.length !== 4 || !g.factors.every(v => Number.isFinite(v) && v >= 0 && v <= 100) || !Number.isFinite(g.adjustment)) throw new RangeError('Invalid fictional score inputs.');
    return Math.max(0, Math.min(100, Math.round(g.factors.reduce((a,b) => a+b,0)/4) + g.adjustment));
  }
  export function level(value: number): Level {
    if (!Number.isFinite(value) || value < 0 || value > 100) throw new RangeError('Score must be 0 to 100.');
    return value >= 85 ? 'Critical' : value >= 60 ? 'High' : value >= 25 ? 'Elevated' : 'Low';
  }
  export function list(gerbils: readonly Gerbil[], query = '', filter = 'All', sort = 'highest', kind = 'All'): Gerbil[] {
    const q = query.trim().toLowerCase();
    return gerbils.filter(g => `${g.name} ${g.alias} ${g.concern} ${g.id} ${g.scientificName} ${g.kind}`.toLowerCase().includes(q) && (filter === 'All' || level(score(g)) === filter) && (kind === 'All' || g.kind === kind))
      .sort((a,b) => sort === 'name' ? a.name.localeCompare(b.name) : (sort === 'lowest' ? score(a)-score(b) : score(b)-score(a)) || a.id.localeCompare(b.id));
  }
  export function recordIncident(state: State, subjectId: string, behaviorId: string, note: string): State {
    const subject = state.gerbils.find(g => g.id === subjectId);
    const behavior = behaviors.find(b => b.id === behaviorId);
    if (!subject || !behavior) throw new Error('Select a registered subject and an observation.');
    if (state.incidents.length >= 250) throw new Error('The imaginary filing cabinet is full. Reset the simulation to empty it.');
    if (note.length > 240) throw new Error('The bureau accepts a maximum of 240 characters.');
    const text = `${behavior.label}.${note.trim() ? ' ' + note.trim() : ''}`;
    const nextScore = Math.max(0,Math.min(100,score(subject)+behavior.delta));
    const actualDelta = nextScore - score(subject);
    const updated = {...subject, adjustment:subject.adjustment+actualDelta};
    return {gerbils:state.gerbils.map(g => g.id===subjectId ? updated : g), incidents:[{id:`INC-${String(state.incidents.length+1).padStart(3,'0')}`,subjectId,text,delta:actualDelta},...state.incidents]};
  }
  // Reassess a known type. Never invent breeds or add individually named pets.
  export function reassess(state: State, id: string, factors: number[]): State {
    const current = state.gerbils.find(g => g.id === id);
    if (!current) throw new Error('Choose a type from the register.');
    const values = [...factors]; score({factors: values, adjustment: 0});
    if (state.incidents.length >= 250) throw new Error('The filing cabinet is full. Reset the simulation.');
    const updated = {...current, factors: values, adjustment: 0};
    return {gerbils: state.gerbils.map(g => g.id === id ? updated : g), incidents: [
      {id:`INC-${String(state.incidents.length+1).padStart(3,'0')}`,subjectId:id,text:'Bureau reassessment: four invented slider values replaced the prior fictional score.',delta:score(updated)-score(current)},
      ...state.incidents
    ]};
  }
  export function dossier(state: State, id: string) {
    const g = state.gerbils.find(subject => subject.id === id);
    if (!g) throw new Error('Subject not found.');
    return {agency:'Bureau of Small Animal Affairs',fictional:true,identityIsReal:true,assessmentIsFictional:true,disclaimer:'Real species or coat variety; fictional threat score and allegations. Not a behavior, safety, or pet suitability assessment.',...g,score:score(g),level:level(score(g)),incidents:state.incidents.filter(i => i.subjectId===id)};
  }
}
