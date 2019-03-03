CREATE TABLE corgiTrait(
  "traitId" INTEGER,
  "corgiId" INTEGER,
  FOREIGN KEY("traitId") REFERENCES trait(id),
  FOREIGN KEY ("corgiId") REFERENCES corgi(id)
);