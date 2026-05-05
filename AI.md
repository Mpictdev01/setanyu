 <!-- AI Generate Section -->

                <div class="ai-generate-section w-full max-w-[1062px] mx-auto mt-6">
                    <div class="ai-generate-window window w-full">
                        <div class="title-bar">
                            <div class="title-bar-text">🤖 AI Generate MOOB PFP 🤖</div>
                            <div class="title-bar-controls">
                                <button aria-label="Minimize"></button>
                                <button aria-label="Maximize"></button>
                                <button aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="window-body">
                            <div class="ai-generate-container">
                                <!-- AI Generate Description -->
                                <div class="ai-description">
                                    <h3 class="ai-title">Transform Your Photo into MOOB Style!</h3>
                                    <p class="ai-subtitle">Upload your photo and create a unique PFP with MOOB character style</p>
                                </div>

                                <!-- Upload Area -->
                                <div class="upload-area" id="upload-area">
                                    <div class="upload-content">
                                        <i class="fas fa-cloud-upload-alt upload-icon"></i>
                                        <h4>Upload Your Photo</h4>
                                        <p>Drag & drop your image here or click to browse</p>
                                        <input type="file" id="photo-input" accept="image/*" class="file-input" hidden>
                                        <button class="browse-btn" onclick="document.getElementById('photo-input').click()">
                                            Choose File
                                        </button>
                                    </div>
                                </div>

                                <!-- Preview Area -->
                                <div class="preview-area" id="preview-area" style="display: none;">
                                    <div class="preview-container">
                                        <h4>Your Photo Preview</h4>
                                        <div class="image-preview">
                                            <img id="preview-image" alt="Preview" class="preview-img">
                                        </div>
                                        <button class="change-photo-btn" onclick="resetUpload()">
                                            <i class="fas fa-undo"></i> Change Photo
                                        </button>
                                    </div>
                                </div>

                                <!-- Style Reference -->
                                <div class="style-reference">
                                    <h4>MOOB Style Reference</h4>
                                    <div class="reference-image">
                                        <img src="img/herio.png" alt="MOOB Character Style" class="reference-img">
                                        <p>Your photo will be transformed to match this MOOB aesthetic</p>
                                    </div>
                                </div>

                                <!-- Generate Button -->
                                <div class="generate-section">
                                    <button class="generate-btn" id="generate-btn" disabled>
                                        <i class="fas fa-magic"></i> Generate MOOB PFP
                                    </button>
                                    <p class="generate-info">Click generate to create your unique MOOB PFP!</p>
                                </div>

                                <!-- Result Area -->
                                <div class="result-area" id="result-area" style="display: none;">
                                    <h4>Your Generated MOOB PFP</h4>
                                    <div class="result-container">
                                        <img id="result-image" alt="Generated MOOB PFP" class="result-img">
                                        <div class="result-actions">
                                            <button class="download-btn">
                                                <i class="fas fa-download"></i> Download PFP
                                            </button>
                                            <button class="share-btn">
                                                <i class="fas fa-share"></i> Share
                                            </button>
                                            <button class="regenerate-btn" onclick="resetResult()">
                                                <i class="fas fa-redo"></i> Generate Again
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Loading State -->
                                <div class="loading-state" id="loading-state" style="display: none;">
                                    <div class="loading-content">
                                        <i class="fas fa-spinner fa-spin loading-icon"></i>
                                        <h4>Generating Your MOOB PFP...</h4>
                                        <p>AI is working its magic! This may take a few moments.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

//

   <!-- MOOB Gallery Section -->

                <div class="gallery-section w-full max-w-[1062px] mx-auto mt-6">
                    <div class="gallery-window window w-full">
                        <div class="title-bar">
                            <div class="title-bar-text">🎨 MOOB Gallery 🎨</div>
                            <div class="title-bar-controls">
                                <button aria-label="Minimize"></button>
                                <button aria-label="Maximize"></button>
                                <button aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="window-body">
                            <div class="gallery-container">
                                <!-- Gallery Navigation -->
                                <div class="gallery-nav">
                                    <button class="gallery-nav-btn active" data-category="all">All</button>
                                    <button class="gallery-nav-btn" data-category="memes">Memes</button>
                                    <button class="gallery-nav-btn" data-category="art">Fan Art</button>
                                    <button class="gallery-nav-btn" data-category="videos">Videos</button>
                                </div>

                                <!-- Gallery Grid -->
                                <div class="gallery-grid">
                                    <!-- Meme Items -->
                                    <div class="gallery-item" data-category="memes">
                                        <img src="img/meme/images_1.avif" alt="MOOB Meme 1" class="gallery-image">
                                        <div class="gallery-overlay">
                                            <div class="gallery-info">
                                                <h4>MOOB Vibes</h4>
                                                <p>Community Meme</p>
                                            </div>
                                            <div class="gallery-actions">
                                                <button class="like-btn" data-likes="42">
                                                    <i class="fas fa-heart"></i>
                                                    <span class="like-count">42</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="gallery-item" data-category="memes">
                                        <img src="img/meme/images_4.avif" alt="MOOB Meme 2" class="gallery-image">
                                        <div class="gallery-overlay">
                                            <div class="gallery-info">
                                                <h4>MOOB Life</h4>
                                                <p>Community Meme</p>
                                            </div>
                                            <div class="gallery-actions">
                                                <button class="like-btn" data-likes="38">
                                                    <i class="fas fa-heart"></i>
                                                    <span class="like-count">38</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="gallery-item" data-category="art">
                                        <img src="img/meme/images_5.avif" alt="MOOB Art 1" class="gallery-image">
                                        <div class="gallery-overlay">
                                            <div class="gallery-info">
                                                <h4>MOOB Art</h4>
                                                <p>Fan Creation</p>
                                            </div>
                                            <div class="gallery-actions">
                                                <button class="like-btn" data-likes="56">
                                                    <i class="fas fa-heart"></i>
                                                    <span class="like-count">56</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="gallery-item" data-category="videos">
                                        <video class="gallery-image" autoplay muted loop>
                                            <source src="img/meme/ridinghorses.mp4" type="video/mp4">
                                        </video>
                                        <div class="gallery-overlay">
                                            <div class="gallery-info">
                                                <h4>MOOB Riding</h4>
                                                <p>Community Video</p>
                                            </div>
                                            <div class="gallery-actions">
                                                <button class="like-btn" data-likes="67">
                                                    <i class="fas fa-heart"></i>
                                                    <span class="like-count">67</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="gallery-item" data-category="memes">
                                        <img src="img/meme/images_7.avif" alt="MOOB Meme 3" class="gallery-image">
                                        <div class="gallery-overlay">
                                            <div class="gallery-info">
                                                <h4>MOOB Dreams</h4>
                                                <p>Community Meme</p>
                                            </div>
                                            <div class="gallery-actions">
                                                <button class="like-btn" data-likes="29">
                                                    <i class="fas fa-heart"></i>
                                                    <span class="like-count">29</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="gallery-item" data-category="art">
                                        <img src="img/meme/images_8.avif" alt="MOOB Art 2" class="gallery-image">
                                        <div class="gallery-overlay">
                                            <div class="gallery-info">
                                                <h4>MOOB Style</h4>
                                                <p>Fan Creation</p>
                                            </div>
                                            <div class="gallery-actions">
                                                <button class="like-btn" data-likes="44">
                                                    <i class="fas fa-heart"></i>
                                                    <span class="like-count">44</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Gallery Footer -->
                                <div class="gallery-footer">
                                    <p class="gallery-stats">Total Items: <span id="total-items">6</span> | Total Likes: <span id="total-likes">276</span></p>
                                    <button class="upload-btn">
                                        <i class="fas fa-upload"></i> Upload Your Creation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
