-- DriveAce Seed Data - 50 realistische deutsche Fahrschulfragen
-- Kategorien und Fragen für Führerschein Klasse B

-- ============================================
-- KATEGORIEN
-- ============================================
INSERT INTO categories (name, description, icon, type, order_index) VALUES
('Verkehrszeichen', 'Alle Verkehrszeichen und ihre Bedeutung', 'sign-caution', 'grundstoff', 1),
('Vorfahrt & Vorrang', 'Vorfahrtsregeln im Straßenverkehr', 'arrow-decision', 'grundstoff', 2),
('Geschwindigkeit', 'Geschwindigkeitsbegrenzungen und Anpassung', 'speedometer', 'grundstoff', 3),
('Abstand & Bremsen', 'Sicherheitsabstände und Bremsverhalten', 'car-brake-alert', 'klassenspezifisch', 4),
('Überholen', 'Überholverbote und Überholregeln', 'car-multiple', 'grundstoff', 5),
('Umwelt & Technik', 'Umweltschutz und Fahrzeugtechnik', 'leaf', 'klassenspezifisch', 6),
('Verhalten im Straßenverkehr', 'Richtiges Verhalten in verschiedenen Situationen', 'account-group', 'grundstoff', 7);

-- ============================================
-- FRAGEN: VERKEHRSZEICHEN (10 Fragen)
-- ============================================
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(1, 'Was bedeutet ein rotes Dreieck mit schwarzem Ausrufezeichen?', 3, 'Das Zeichen 101 "Gefahrstelle" warnt vor einer nicht näher bezeichneten Gefahr. Sie müssen Ihre Geschwindigkeit anpassen und besonders vorsichtig fahren.', 'easy'),
(1, 'Was bedeutet ein rundes blaues Schild mit weißem Pfeil nach rechts?', 2, 'Das Zeichen 209 "Vorgeschriebene Fahrtrichtung rechts" schreibt vor, dass Sie nur nach rechts fahren dürfen. Ein Geradeausfahren oder Linksabbiegen ist verboten.', 'easy'),
(1, 'Sie sehen ein rundes rotes Schild mit weißem Querbalken. Was bedeutet das?', 2, 'Das Zeichen 267 "Verbot der Einfahrt" bedeutet, dass Sie hier nicht einfahren dürfen. Dies gilt in der Regel für Einbahnstraßen in Gegenrichtung.', 'easy'),
(1, 'Was bedeutet ein rundes blaues Schild mit weißem Fahrrad?', 2, 'Das Zeichen 237 "Radweg" schreibt vor, dass Radfahrer diesen Weg benutzen müssen. Für andere Fahrzeuge ist der Weg gesperrt.', 'easy'),
(1, 'Sie sehen ein achteckiges rotes Schild mit der Aufschrift "STOP". Was müssen Sie tun?', 4, 'Das Zeichen 206 "Halt! Vorfahrt gewähren!" bedeutet, dass Sie an der Haltlinie anhalten müssen, auch wenn kein anderes Fahrzeug kommt. Erst nach dem Anhalten dürfen Sie vorsichtig weiterfahren.', 'medium'),
(1, 'Was bedeutet ein gelbes Schild mit schwarzem Pfeil und Gegenverkehr-Symbol?', 3, 'Das Zeichen warnt vor Gegenverkehr. Sie befinden sich auf einer Straße, auf der vorübergehend Gegenverkehr möglich ist.', 'medium'),
(1, 'Was bedeutet ein rundes blaues Schild mit der Zahl 30?', 2, 'Das Zeichen 275 "Vorgeschriebene Mindestgeschwindigkeit 30 km/h" schreibt vor, dass Sie mindestens 30 km/h fahren müssen, sofern die Verkehrslage dies zulässt.', 'medium'),
(1, 'Sie sehen ein weißes Schild mit rotem Rand und einem Auto sowie einem Motorrad. Was bedeutet das?', 3, 'Das Zeichen 260 "Verbot für Krafträder und Mofas sowie für Kraftwagen und sonstige mehrspurige Kraftfahrzeuge" verbietet die Einfahrt für diese Fahrzeuge.', 'hard'),
(1, 'Was bedeutet ein dreieckiges Schild mit zwei sich kreuzenden Pfeilen?', 3, 'Das Zeichen warnt vor einer Kreuzung oder Einmündung, bei der Sie Vorfahrt gewähren müssen.', 'medium'),
(1, 'Ein Zusatzschild zeigt ein Fahrrad mit "frei". Was bedeutet das?', 2, 'Das Zusatzschild bedeutet, dass Radfahrer den normalerweise für sie gesperrten Weg benutzen dürfen.', 'easy');

-- ============================================
-- ANTWORTEN: VERKEHRSZEICHEN
-- ============================================
-- Frage 1
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(1, 'Gefahrstelle', 1, 1),
(1, 'Vorfahrt gewähren', 0, 2),
(1, 'Parkverbot', 0, 3);

-- Frage 2
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(2, 'Vorgeschriebene Fahrtrichtung rechts', 1, 1),
(2, 'Rechts fahren empfohlen', 0, 2),
(2, 'Vorfahrt von rechts', 0, 3);

-- Frage 3
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(3, 'Verbot der Einfahrt', 1, 1),
(3, 'Halteverbot', 0, 2),
(3, 'Durchfahrt verboten', 0, 3);

-- Frage 4
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(4, 'Radweg - Benutzungspflicht für Radfahrer', 1, 1),
(4, 'Radfahrer verboten', 0, 2),
(4, 'Gemeinsamer Fuß- und Radweg', 0, 3);

-- Frage 5
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(5, 'An der Haltlinie anhalten, dann vorsichtig weiterfahren', 1, 1),
(5, 'Geschwindigkeit reduzieren und vorsichtig weiterfahren', 0, 2),
(5, 'Nur anhalten, wenn andere Fahrzeuge kommen', 0, 3);

-- Frage 6
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(6, 'Warnung vor Gegenverkehr', 1, 1),
(6, 'Überholverbot', 0, 2),
(6, 'Warnung vor Engstelle', 0, 3);

-- Frage 7
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(7, 'Mindestgeschwindigkeit 30 km/h', 1, 1),
(7, 'Höchstgeschwindigkeit 30 km/h', 0, 2),
(7, 'Empfohlene Geschwindigkeit 30 km/h', 0, 3);

-- Frage 8
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(8, 'Verbot für Kraftfahrzeuge', 1, 1),
(8, 'Parkverbot für Kraftfahrzeuge', 0, 2),
(8, 'Ende der Kraftfahrstraße', 0, 3);

-- Frage 9
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(9, 'Kreuzung - Vorfahrt gewähren', 1, 1),
(9, 'Gegenverkehr hat Vorfahrt', 0, 2),
(9, 'Verkehr von beiden Seiten', 0, 3);

-- Frage 10
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(10, 'Radfahrer dürfen den Weg benutzen', 1, 1),
(10, 'Radfahrer haben Vorfahrt', 0, 2),
(10, 'Radfahrer müssen absteigen', 0, 3);

-- ============================================
-- FRAGEN: VORFAHRT & VORRANG (10 Fragen)
-- ============================================
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(2, 'Sie nähern sich einer Kreuzung ohne Verkehrszeichen. Welche Regel gilt?', 4, 'An Kreuzungen ohne Verkehrszeichen gilt die Grundregel "Rechts vor Links". Fahrzeuge, die von rechts kommen, haben Vorfahrt.', 'medium'),
(2, 'Sie wollen an einer T-Kreuzung von der untergeordneten Straße nach links abbiegen. Wer hat Vorfahrt?', 5, 'Wenn Sie von der untergeordneten Straße kommen, müssen Sie allen Fahrzeugen auf der Hauptstraße Vorfahrt gewähren - sowohl von links als auch von rechts.', 'hard'),
(2, 'Ein Polizist zeigt mit ausgestrecktem Arm auf Sie. Was bedeutet das?', 4, 'Wenn der Polizist mit dem Arm auf Sie zeigt (frontal oder von hinten), bedeutet dies "Halt" - Sie müssen vor der Kreuzung warten.', 'medium'),
(2, 'Sie befinden sich in einem Kreisverkehr. Wer hat Vorfahrt beim Verlassen?', 3, 'Beim Verlassen des Kreisverkehrs müssen Sie Fußgängern und Radfahrern auf dem Radweg Vorfahrt gewähren. Blinken Sie rechts beim Ausfahren!', 'medium'),
(2, 'Was gilt auf einem Parkplatz hinsichtlich der Vorfahrt?', 3, 'Auf Parkplätzen gilt die Regel "Rechts vor Links", sofern keine anderen Regelungen getroffen sind. Besondere Vorsicht ist geboten.', 'medium'),
(2, 'Sie kommen an eine Kreuzung mit abgeknickter Vorfahrt. Wie verhalten Sie sich?', 4, 'Sie folgen dem Verlauf der Vorfahrtstraße. Andere müssen Ihnen Vorfahrt gewähren. Achtung: Wenn Sie die Vorfahrtstraße verlassen, müssen Sie blinken!', 'medium'),
(2, 'Wer hat Vorfahrt: Sie auf der Hauptstraße oder ein Einsatzfahrzeug mit Blaulicht?', 5, 'Einsatzfahrzeuge mit Blaulicht UND Martinshorn haben immer Vorfahrt. Sie müssen sofort freie Bahn schaffen und wenn nötig anhalten.', 'easy'),
(2, 'Sie wollen nach rechts abbiegen. Ein Radfahrer fährt rechts neben Ihnen. Was ist richtig?', 4, 'Sie müssen dem Radfahrer Vorrang gewähren! Viele Unfälle passieren beim Rechtsabbiegen. Schulterblick ist Pflicht!', 'medium'),
(2, 'Wie verhalten Sie sich an einem Fußgängerüberweg (Zebrastreifen)?', 5, 'Sie müssen Fußgängern, die den Überweg erkennbar benutzen wollen, das Überqueren ermöglichen. Bei Bedarf müssen Sie anhalten.', 'easy'),
(2, 'Zwei Fahrzeuge stehen sich an einer engen Stelle gegenüber. Wer muss warten?', 4, 'Wenn ein Hindernis auf Ihrer Seite ist, müssen Sie warten. Bei Gegenverkehr hat derjenige Vorrang, auf dessen Seite sich kein Hindernis befindet.', 'hard');

-- Antworten Frage 11-20
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(11, 'Rechts vor Links', 1, 1),
(11, 'Links vor Rechts', 0, 2),
(11, 'Der Schnellere hat Vorfahrt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(12, 'Alle Fahrzeuge auf der Hauptstraße', 1, 1),
(12, 'Nur Fahrzeuge von links', 0, 2),
(12, 'Nur Fahrzeuge von rechts', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(13, 'Halt - vor der Kreuzung warten', 1, 1),
(13, 'Sie dürfen weiterfahren', 0, 2),
(13, 'Fahren Sie langsam', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(14, 'Fußgängern und Radfahrern', 1, 1),
(14, 'Einfahrenden Fahrzeugen', 0, 2),
(14, 'Niemand, ich habe Vorfahrt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(15, 'Rechts vor Links', 1, 1),
(15, 'Der Schnellere', 0, 2),
(15, 'Keine Regel', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(16, 'Ich folge der Vorfahrtstraße und habe Vorfahrt', 1, 1),
(16, 'Ich muss allen Vorfahrt gewähren', 0, 2),
(16, 'Rechts vor Links gilt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(17, 'Einsatzfahrzeug mit Blaulicht UND Martinshorn', 1, 1),
(17, 'Ich auf der Hauptstraße', 0, 2),
(17, 'Wer zuerst da ist', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(18, 'Ich muss dem Radfahrer Vorrang gewähren', 1, 1),
(18, 'Der Radfahrer muss warten', 0, 2),
(18, 'Gleichzeitig abbiegen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(19, 'Anhalten und Fußgänger überqueren lassen', 1, 1),
(19, 'Langsam weiterfahren', 0, 2),
(19, 'Hupen und weiterfahren', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(20, 'Derjenige, auf dessen Seite das Hindernis ist', 1, 1),
(20, 'Der langsamere Fahrer', 0, 2),
(20, 'Beide gleichzeitig', 0, 3);

-- ============================================
-- FRAGEN: GESCHWINDIGKEIT (10 Fragen)
-- ============================================
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(3, 'Wie schnell dürfen Sie innerorts mit einem PKW fahren?', 2, 'Innerhalb geschlossener Ortschaften gilt eine Höchstgeschwindigkeit von 50 km/h für alle Kraftfahrzeuge.', 'easy'),
(3, 'Wie schnell dürfen Sie außerorts auf Landstraßen mit einem PKW fahren?', 2, 'Außerhalb geschlossener Ortschaften auf Landstraßen dürfen PKW 100 km/h fahren, sofern nicht anders ausgeschildert.', 'easy'),
(3, 'Welche Höchstgeschwindigkeit gilt auf Autobahnen für PKW ohne Anhänger?', 3, 'Auf Autobahnen gibt es in Deutschland grundsätzlich keine generelle Geschwindigkeitsbegrenzung für PKW, jedoch eine Richtgeschwindigkeit von 130 km/h.', 'medium'),
(3, 'Sie fahren mit einem PKW und Anhänger außerorts. Wie schnell dürfen Sie maximal fahren?', 4, 'Mit Anhänger dürfen Sie außerorts maximal 80 km/h fahren, auch auf Autobahnen und Kraftfahrstraßen.', 'medium'),
(3, 'Wann müssen Sie Ihre Geschwindigkeit anpassen?', 4, 'Sie müssen Ihre Geschwindigkeit immer den Straßen-, Verkehrs- und Sichtverhältnissen sowie Ihren persönlichen Fähigkeiten anpassen.', 'medium'),
(3, 'Was bedeutet die Richtgeschwindigkeit von 130 km/h auf Autobahnen?', 3, 'Die Richtgeschwindigkeit ist eine Empfehlung, keine Pflicht. Bei Unfällen über 130 km/h kann Ihnen aber eine Mitschuld angelastet werden.', 'medium'),
(3, 'In einer Spielstraße (Verkehrsberuhigter Bereich) - wie schnell dürfen Sie fahren?', 3, 'In verkehrsberuhigten Bereichen (Zeichen 325.1) gilt Schrittgeschwindigkeit, also etwa 4-7 km/h. Fußgänger dürfen die Straße in voller Breite nutzen.', 'easy'),
(3, 'Sie sehen das Schild "Zone 30". Was gilt?', 2, 'In einer Tempo-30-Zone dürfen Sie maximal 30 km/h fahren. Dies gilt oft in Wohngebieten.', 'easy'),
(3, 'Bei Nebel mit Sichtweite unter 50m - welche Höchstgeschwindigkeit gilt?', 5, 'Bei Sichtweiten unter 50 Metern dürfen Sie maximal 50 km/h fahren, auch auf Autobahnen! Nebelschlussleuchte ist dann erlaubt.', 'hard'),
(3, 'Sie fahren bei Regen auf der Autobahn. Was ist zu beachten?', 4, 'Bei Nässe verlängert sich der Bremsweg erheblich. Passen Sie Ihre Geschwindigkeit an und erhöhen Sie den Sicherheitsabstand!', 'medium');

-- Antworten Frage 21-30
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(21, '50 km/h', 1, 1),
(21, '60 km/h', 0, 2),
(21, '30 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(22, '100 km/h', 1, 1),
(22, '80 km/h', 0, 2),
(22, '120 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(23, 'Keine generelle Begrenzung (Richtgeschwindigkeit 130 km/h)', 1, 1),
(23, '130 km/h', 0, 2),
(23, '150 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(24, '80 km/h', 1, 1),
(24, '100 km/h', 0, 2),
(24, '90 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(25, 'Immer den Straßen-, Verkehrs- und Sichtverhältnissen', 1, 1),
(25, 'Nur bei schlechtem Wetter', 0, 2),
(25, 'Nur innerorts', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(26, 'Empfehlung, keine Pflicht', 1, 1),
(26, 'Verbindliche Höchstgeschwindigkeit', 0, 2),
(26, 'Nur für LKW', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(27, 'Schrittgeschwindigkeit (4-7 km/h)', 1, 1),
(27, '20 km/h', 0, 2),
(27, '30 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(28, 'Maximal 30 km/h', 1, 1),
(28, 'Empfohlene 30 km/h', 0, 2),
(28, 'Mindestens 30 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(29, 'Maximal 50 km/h', 1, 1),
(29, 'Maximal 80 km/h', 0, 2),
(29, 'Maximal 60 km/h', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(30, 'Geschwindigkeit reduzieren, Abstand vergrößern', 1, 1),
(30, 'Normal weiterfahren', 0, 2),
(30, 'Nur Abstand vergrößern', 0, 3);

-- ============================================
-- FRAGEN: ABSTAND & BREMSEN (10 Fragen)
-- ============================================
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(4, 'Welchen Sicherheitsabstand müssen Sie bei 100 km/h einhalten?', 4, 'Die Faustregel lautet: Halber Tachowert in Metern. Bei 100 km/h also 50 Meter Abstand.', 'medium'),
(4, 'Wie können Sie den Sicherheitsabstand überprüfen?', 3, 'Leitpfosten stehen alle 50m. Bei 100 km/h = 1 Leitpfosten, bei 50 km/h = 1/2 Leitpfosten (25m).', 'medium'),
(4, 'Was ist der Bremsweg bei 50 km/h (Faustformel)?', 4, '(Geschwindigkeit / 10) × (Geschwindigkeit / 10) = (50/10) × (50/10) = 5 × 5 = 25 Meter.', 'medium'),
(4, 'Was ist der Anhalteweg?', 5, 'Anhalteweg = Reaktionsweg + Bremsweg. Der Reaktionsweg ist (Geschwindigkeit/10) × 3.', 'hard'),
(4, 'Bei einer Gefahrbremsung verlängert sich der Bremsweg. Richtig oder falsch?', 3, 'Falsch! Bei einer Gefahrbremsung wird der Bremsweg kürzer, weil stärker gebremst wird. Die Formel ist dann (Geschw./10) × (Geschw./10) : 2.', 'hard'),
(4, 'Wie verändert sich der Bremsweg bei doppelter Geschwindigkeit?', 5, 'Der Bremsweg vervierfacht sich! Von 50 auf 100 km/h: statt 25m nun 100m Bremsweg.', 'hard'),
(4, 'Sie fahren bei Nässe. Wie verändert sich der Bremsweg?', 4, 'Bei Nässe kann sich der Bremsweg verdoppeln, bei Glätte sogar verzehnfachen. Geschwindigkeit reduzieren!', 'medium'),
(4, 'Was ist beim Abstand zum vorausfahrenden Fahrzeug zu beachten?', 4, 'Mindestens halber Tachowert in Metern. Bei schlechter Sicht, Nässe oder dichtem Verkehr mehr Abstand halten.', 'medium'),
(4, 'Wann müssen Sie besonders viel Abstand halten?', 4, 'Bei Nässe, Glätte, schlechter Sicht, hinter LKW, vor Bahnübergängen und bei schwerem Gepäck/Anhänger.', 'medium'),
(4, 'Was bedeutet "Auffahren" rechtlich?', 5, 'Wer auffährt, hat in der Regel den Abstand nicht eingehalten und trägt die Schuld am Unfall (außer bei plötzlichem grundlosen Bremsen).', 'medium');

-- Antworten Frage 31-40
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(31, '50 Meter (halber Tachowert)', 1, 1),
(31, '100 Meter', 0, 2),
(31, '30 Meter', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(32, 'Mit Leitpfosten (alle 50m)', 1, 1),
(32, 'Nach Gefühl', 0, 2),
(32, 'Mit dem Tacho', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(33, '25 Meter', 1, 1),
(33, '50 Meter', 0, 2),
(33, '15 Meter', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(34, 'Reaktionsweg + Bremsweg', 1, 1),
(34, 'Nur Bremsweg', 0, 2),
(34, 'Doppelter Bremsweg', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(35, 'Falsch - er wird kürzer', 1, 1),
(35, 'Richtig - er wird länger', 0, 2),
(35, 'Bleibt gleich', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(36, 'Er vervierfacht sich', 1, 1),
(36, 'Er verdoppelt sich', 0, 2),
(36, 'Er verdreifacht sich', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(37, 'Er kann sich verdoppeln oder mehr', 1, 1),
(37, 'Er bleibt gleich', 0, 2),
(37, 'Er verringert sich leicht', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(38, 'Mindestens halber Tachowert in Metern', 1, 1),
(38, 'Immer 10 Meter', 0, 2),
(38, 'Ganzer Tachowert', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(39, 'Bei Nässe, Glätte, schlechter Sicht', 1, 1),
(39, 'Nur nachts', 0, 2),
(39, 'Nur bei Schnee', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(40, 'Der Auffahrende hat meist Schuld (Abstand nicht eingehalten)', 1, 1),
(40, 'Der Vordermann hat immer Schuld', 0, 2),
(40, 'Beide sind gleich schuld', 0, 3);

-- ============================================
-- FRAGEN: ÜBERHOLEN (10 Fragen)
-- ============================================
INSERT INTO questions (category_id, question_text, points, explanation, difficulty) VALUES
(5, 'Wann ist Überholen verboten?', 5, 'Bei unklarer Verkehrslage, an Fußgängerüberwegen, an Bahnübergängen, bei durchgezogener Linie und wo Verkehrszeichen es verbieten.', 'hard'),
(5, 'Wo dürfen Sie innerorts nicht überholen?', 4, 'An Fußgängerüberwegen und an Bahnübergängen. Auch wenn die Sicht eingeschränkt ist.', 'medium'),
(5, 'Sie überholen außerorts. Was ist zu beachten?', 4, 'Ausreichend Abstand halten, deutlich schneller sein als der Überholte, Blinker setzen, Gegenverkehr und nachfolgenden Verkehr beachten.', 'medium'),
(5, 'Dürfen Sie rechts überholen?', 5, 'Nur innerorts bei Fahrzeugen, die links abbiegen wollen. Auf Autobahnen nur bei stockendem Verkehr (Schrittgeschwindigkeit) und mit maximal 20 km/h Differenz.', 'hard'),
(5, 'Ein LKW überholt Sie auf der Autobahn. Was tun?', 3, 'Geschwindigkeit beibehalten oder leicht reduzieren, um den Überholvorgang zu erleichtern. Nicht beschleunigen!', 'medium'),
(5, 'Wann müssen Sie nach dem Überholen wieder einscheren?', 4, 'Sobald Sie im Rückspiegel beide Scheinwerfer des überholten Fahrzeugs sehen können. Nicht zu knapp einscheren!', 'medium'),
(5, 'Sie werden überholt. Wie verhalten Sie sich?', 3, 'Geschwindigkeit beibehalten oder leicht reduzieren. Nicht nach links lenken oder beschleunigen!', 'easy'),
(5, 'Vor einer unübersichtlichen Kurve - dürfen Sie überholen?', 5, 'Nein! Bei unübersichtlichen Straßenverhältnissen ist Überholen verboten. Unfallgefahr!', 'easy'),
(5, 'Was bedeutet eine durchgezogene gelbe Linie?', 3, 'Überfahrverbot! Sie dürfen die Linie nicht überfahren - weder zum Überholen noch zum Wenden.', 'easy'),
(5, 'Überholen im Überholverbot - welche Strafe droht?', 4, 'Bußgeld ab 70€, 1 Punkt in Flensburg. Bei Gefährdung bis zu 300€ und Fahrverbot möglich.', 'medium');

-- Antworten Frage 41-50
INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(41, 'Bei unklarer Verkehrslage, an Fußgängerüberwegen, an Bahnübergängen', 1, 1),
(41, 'Nur nachts', 0, 2),
(41, 'Nur bei Regen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(42, 'An Fußgängerüberwegen und Bahnübergängen', 1, 1),
(42, 'Nirgends', 0, 2),
(42, 'Nur an Ampeln', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(43, 'Abstand halten, deutlich schneller sein, Blinker setzen', 1, 1),
(43, 'Einfach vorbeifahren', 0, 2),
(43, 'Hupen und überholen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(44, 'Nur bei Linksabbiegern innerorts und stockendem Verkehr auf Autobahn', 1, 1),
(44, 'Immer erlaubt', 0, 2),
(44, 'Nie erlaubt', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(45, 'Geschwindigkeit beibehalten oder leicht reduzieren', 1, 1),
(45, 'Beschleunigen', 0, 2),
(45, 'Bremsen', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(46, 'Wenn ich beide Scheinwerfer im Rückspiegel sehe', 1, 1),
(46, 'Sofort nach dem Vorbeifahren', 0, 2),
(46, 'Nach 50 Metern', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(47, 'Geschwindigkeit beibehalten, nicht beschleunigen', 1, 1),
(47, 'Beschleunigen', 0, 2),
(47, 'Nach links lenken', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(48, 'Nein, Überholverbot bei unübersichtlicher Strecke', 1, 1),
(48, 'Ja, wenn kein Gegenverkehr kommt', 0, 2),
(48, 'Ja, wenn ich schnell bin', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(49, 'Überfahrverbot - nicht überfahren', 1, 1),
(49, 'Parkverbot', 0, 2),
(49, 'Halteverbot', 0, 3);

INSERT INTO answers (question_id, answer_text, is_correct, order_index) VALUES
(50, 'Bußgeld ab 70€ und 1 Punkt', 1, 1),
(50, 'Nur Verwarnung', 0, 2),
(50, 'Keine Strafe', 0, 3);

-- ============================================
-- Initiale Settings für local_user
-- ============================================
INSERT INTO settings (user_id, dark_mode, notifications_enabled, sound_enabled) VALUES
('local_user', 0, 1, 1);

INSERT INTO streaks (user_id, current_streak, longest_streak) VALUES
('local_user', 0, 0);
